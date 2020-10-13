const fs = require('fs');


if (process.argv.length === 2) {
  console.error('Erreur : il faut entrer le chemin');
  process.exit(1);
}
else{
	let [,,path,ext]= process.argv;

	fs.readdir(path, (err, files) => { 
	  if (err) 
	    console.log(err); 
	  else { 
	    console.log("\nContenu du chemin -" + path + " :"); 
	    files.forEach(file => { 
	      		console.log(file); 
	    }) 
	  } 
	}) ;	
}	