require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()


app.use(cors())
app.use(express.json())

morgan.token('baseUrl',(req,res) => {
	return req.baseUrl;
})
morgan.token('objContent',(req,res) => {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :objContent'))


app.get('/api/persons', (req, res) => {
	Person.find({}).then(results => {
		res.json(results)
	})
})

// app.get('/info', (req, res) => {
// 	const currentTime = new Date()
// 	res.send(`<p>Phonebook has info for ${persons.length} people</p>
// 						<p>${currentTime}</p>
// 					`)
// })

// app.get('/api/persons/:id',(req, res) => {
// 	const id = Number(req.params.id)
// 	const person = persons.find(p => p.id === id)
// 	if (person) {
// 		res.json(person)
// 	} else { 
// 		res.status(404).end()
// 	}
	
// })


app.post('/api/persons', (req,res) => {
	const body = req.body
	 
	if (!body.name||!body.number||false) {
		return res.status(400).json({
			error: 'name or number is missing'
		})}
	// } else if (persons.some(p=>p.name===body.name)) {
	// 	return res.status(400).json({
	// 		error: 'name already existed'
	// 	})
	// }
	
	// const person = {
	// 	...body,
	// 	id: generateID()
	// }

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save().then(returnObj => {
		console.log(`Added ${returnObj.name} to phonebook` )
		res.json(returnObj)
	})
})

// app.delete('/api/persons/:id',(req, res) => {
// 	const id = Number(req.params.id)
// 	persons = persons.filter(p => p.id !== id)
	
// 	res.status(204).end()
// })

const PORT = process.env.PORT
app.listen(PORT,() => {
	console.log(`Server is running on port ${PORT}`);
})