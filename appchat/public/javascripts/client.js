var me;
var channel;

$(function() {

    //on lance la connexion socket.io
    var socket = io();

    //on cache les popups
    $("#isLog").hide();
    $('#primary').hide();
    $('#danger').hide();
    $('#succes').hide();

    //quand le bouton du formulaire d'identification est pressé :
    $('#login-form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        me = $('#username').val();
        channel = $('#chat').val();
        socket.emit('login', me); //on emet le signal de connexion
        //Mise en place de la page de l'utilisateur
        $('#logdiv').hide(); // on cache le formulaire de connexion
        $("#isLog").show(); // on montre le formulaire d'envoi de message
        $("#welcome").text('Content de vous revoir ' + me);
        $("#welcome-channel").text("Vous êtes dans le salon " + channel);
    });

    //Quand le bouton d'envoi de message est pressé
    $('#msg-form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        let msg = $('#msg').val(); //on va chercher le message
        $('#msg').val(''); //on vide le champ
        socket.emit('msg', { author: me, msg : msg, time: getDate(), channel: channel }); //on emet le signal d'envoi de message
        notify($('#succes')); //On affiche la notification d'envoi de message
    });

    //Quand on reçoit un message
    socket.on('msg', (msg) => {
        writeMessage(msg);
    });

    //Quand un utilisateur se connecte
    socket.on('someone is log', (object) => {
        //on prends le dernier element de la liste des utilisateurs connectés
        var newUser = object.users[object.users.length - 1];

        //si ce n'est pas moi envoyer une notif
        if(newUser !== me){
            $("#primary").text(newUser + ' vient de se connecter');
            notify($('#primary'));
        }
        else//sinon on affiche les x derniers messages
            writeXmessages(object.msgs,3);

        //mettre à jour la liste des utilisateurs connectés
        setConnected(object.users);

        //Quand un utilisateur se déconnecte
        socket.on('bye', () => {
            //On signale qu'on est encore là
            socket.emit("still here", me)
        });

        //Quand on sait qui s'est deconnecté
        socket.on('bye user', (data) => {
            $("#danger").text(data.user + ' vient de se déconnecter');
            notify($('#danger'));
            //mettre à jour la liste des utilisateurs connectés
            setConnected(data.users);
        });

    });

});

//permet d'ecrire 1 message
function writeMessage(msg){
    //Si on est dans le bon channel
    if(msg.channel === channel){
        if(msg.author === me) //si c'est mon message on affiche en bleu
            $('.list-group').append('<li class="list-group-item d-flex align-items-center"><span class="badge badge-primary mr-2 badge-pill">'+ msg.author + '</span>' + msg.msg + '<span class="badge badge-info align-text-right ml-auto badge-pill">' + msg.time + '</span></li>');
        else //sinon on affiche en gris
            $('.list-group').append('<li class="list-group-item d-flex align-items-center"><span class="badge badge-secondary mr-2 badge-pill">'+ msg.author + '</span>' + msg.msg + '<span class="badge badge-info align-text-right ml-auto badge-pill">' + msg.time + '</span></li>');
    return 1;
    }
    return 0;
}

//permet d'ecrire x messages
function writeXmessages (msgs, x){
    var i = 0;
    var ok = 1;

        while (i < msgs.length && ok <= x) {
            ok += writeMessage(msgs[i])
            i++;
        }
}

//permet d'afficher une notification donnée
function notify (object) {
    object.show();
    setTimeout(function () {
        object.fadeOut('fast');
    }, 2000);
}

//Avoir une date à l'instant T
function getDate () {
    let today = new Date();
   return addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());
}

//Ajouter le 0 devant les chiffres
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//
function setConnected(users){
    $("#connectedList").remove();
    $('#usersonline').append('<ul class="pagination justify-content-end", id="connectedList">')
    for(let i in users){
        $("#connectedList").append('<li class="page-item"><a class="page-link">' + users[i] +'</a></li>');
    }
}

