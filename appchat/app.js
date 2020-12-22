var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var http = require('http').createServer(app);

var io = require('socket.io')(http);

var users = [];

var usersOnline = [];

var messages = [];

//petite fonction pour determiner quel element il manque dans dans la liste
function user_missing(a1, a2) {

    var a = [], diff = [];

    for (let i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (let i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (let k in a) {
        diff.push(k);
    }

    return diff;
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('login', (user) => {
        console.log('user: ' + user + ' is with us !');
        users.push(user);
        console.log(users);
        io.emit('someone is log', {users: users, msgs: messages});

        socket.on('disconnect', () => {
            console.log('An user disconnected');
            //on vide le tableau d'user en ligne car il va changer
            usersOnline = [];
            //on signale aux clients qu'un utilisateur s'est déconnecté
            io.emit('bye');
        });

    });

    //quand un utilisateur nous signal sa présence
    socket.on('still here', (user) => {

        //Je fais ça car je reçois des reponses en trop à la fin jsp pq
        if (usersOnline.length < (users.length - 1)) {
            //on note les présents
            usersOnline.push(user);

            //quand on a compté tous les présents moins celui qui manque
            if (usersOnline.length === (users.length - 1)) {
                //on cherche de qui il s'agit
                let userLeft = user_missing(users, usersOnline);
                //On met à jours la liste des users online avec la liste des présents
                users = usersOnline;
                console.log('il manque : ' + userLeft);
                console.log('il reste : ' + users);
                io.emit('bye user', {users: users, user: userLeft});
            }
        }

    });

    socket.on('msg', (msg) => {
        messages.push(msg);
        io.emit('msg', msg);
        console.log('user: ' + msg.author + ' says : ' + msg.msg + ' at ' + msg.time + ' on channel : ' + msg.channel);
    });
});

//We make the http server listen on port 3000.
http.listen(8080, () => {
    console.log('listening on localhost:8080');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Pour rendre le repertoire public disponible au client
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {app: app};