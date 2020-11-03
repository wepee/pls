var http = require('http');
var swig = require('swig');
var url = require('url');
var qs = require('querystring'); 

function error404(res, page){
	res.writeHead(404, {'Content-type':'text/html'});
	res.write(swig.renderFile('src/templates/404.tpl',
	{ name: page }));
};

exports.startServer = function(port) {
	var server = http.createServer(function(req, res){
	var page = url.parse(req.url).pathname;
	if (page === '/'){
		// on recupere les parametres dans l'url
		var params = qs.parse(url.parse(req.url).query);

		var data = {name: 'unknown user'};

		if('name' in params){
			data['name'] = params['name'];
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(swig.renderFile('src/templates/home.tpl',data));
	}
	else if (page === '/message'){
		if (req.method === 'POST'){
			var post_data = '';
			req.on('data', function(p_data){
			post_data += p_data;
			});

			req.on('end', function() {
				var final_data = qs.parse(post_data);
				if ('msg' in final_data) {
					console.log('RECU: ' + final_data['msg']);
					res.writeHead(200,{'Content-Type': 'text/html'});
					res.write('<h1>POST</h1><p>Donnees bien recues</p>');
					res.end();
				}
				else {
					console.log('Absence de données!');
					res.writeHead(200,{'Content-Type': 'text/html'});
					res.write('<h1>POST</h1><p>Aucune données</p>');
					res.end();
				}
			});
		}
		else{
			error404(res, page);
		}
	}
	else{
		error404(res, page);
	}

});

server.listen(port);
console.log("Server running on " + port);

}