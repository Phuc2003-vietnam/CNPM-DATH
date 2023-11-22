function checkInput(input) {
	try {
		// Attempt to parse the input as JSON
		const parsedJson = JSON.parse(input)

		// If successful, it's a JSON object
		console.log('Input is a JSON object:', parsedJson)
		return true
	} catch (error) {
		// If parsing fails, it's not a JSON object
		if (typeof input === 'string') {
			console.log('Input is a string:', input)
			return false
		} else {
			console.log('Input is neither a string nor a JSON object')
			return false
		}
	}
}

// Example usage:
const input1 = '{"name":"John", "age":30, "city":"New York"}'
const input2 = '{"key": "value"}'
const input3 = '{"paperSize":"A4", "numVersion": 1,"colorOption": false ,"landScapeOption": false,"pagesPerSheet": 3}'


checkInput(input1)
checkInput(input2)
checkInput(input3)
