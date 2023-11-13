// Parent class
class Animal {
	sayName() {
		console.log('My name is  animal')
	}
}

// Child class that extends the parent class
const a = new Animal()
a.sayHi = function () {
	console.log('dcm')
}
a.sayHi()
