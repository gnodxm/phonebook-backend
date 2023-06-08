const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide password as parameter');
}

const password = process.argv[2]
const url = `mongodb+srv://gnod:${password}@cluster0.rng4z.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = mongoose.Schema({
	name:String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 5) {
	const newName = process.argv[3]
	const newNumber = process.argv[4]

	const person = new Person ({
		name:newName,
		number: newNumber
	})
	
	person.save().then(result => {
		console.log(`added ${newName} number ${newNumber} to phonebook`);
		mongoose.connection.close()
	})
} else if (process.argv.length === 3) {
	Person.find({}).then(persons => {
		console.log('phonebook:')
		persons.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}