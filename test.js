// Parent class
class Animal {
	sayName() {
		console.log('My name is  animal')
	}
}

// Child class that extends the parent class
class Dog extends Animal {
	bark() {
		console.log('Woof! Woof!')
	}
}
new Dog().sayName()
new Dog().bark()
