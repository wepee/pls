class User {

	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	

	sayHello(){
		console.log(this.name + ": Hello !")
	}

}



var Adam = new User("Adam",22);
var Greg = new User("Greg",21);
var Julien = new User("Julien",21);

Adam.sayHello();
Greg.sayHello();
Julien.sayHello();

