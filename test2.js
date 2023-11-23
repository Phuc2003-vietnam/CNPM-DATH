	const numbers = [1, 2, 3, 4, 5]
	// Using map to create a new array where each element is doubled
	const doubledNumbers = numbers.map(async (num) => {
		return num * 2
	})
	const tripledNumbers = numbers.map(async (num) => {
		return num * 3
	})
	Promise.all(doubledNumbers).then((data) => console.log(data))
