var today = new Date()
var dd = String(today.getDate()).padStart(2, '0')
var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
var yyyy = today.getFullYear()

today = yyyy + '-' + mm + '-' + dd + 'T23:59:00'
console.log(new Date(today))

// if (new Date(today) < new Date('2023-11-16T23:58')) {
// 	console.log('be hon')
// } else {
// 	console.log('lon hon')
// }
console.log(new Date())
