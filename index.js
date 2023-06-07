const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
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

let persons = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/info', (req, res) => {
	const currentTime = new Date()
	res.send(`<p>Phonebook has info for ${persons.length} people</p>
						<p>${currentTime}</p>
					`)
})

app.get('/api/persons/:id',(req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(p => p.id === id)
	if (person) {
		res.json(person)
	} else { 
		res.status(404).end()
	}
	
})

const generateID = () => {
	return Math.floor(Math.random()*1000)
}

app.post('/api/persons', (req,res) => {
	const body = req.body
	 
	if (!body.name||!body.number||false) {
		return res.status(400).json({
			error: 'name or number is missing'
		})
	} else if (persons.some(p=>p.name===body.name)) {
		return res.status(400).json({
			error: 'name already existed'
		})
	}
	
	const person = {
		...body,
		id: generateID()
	}

	persons = persons.concat(person)
	morgan
	res.json(person)
})

app.delete('/api/persons/:id',(req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(p => p.id !== id)
	
	res.status(204).end()
})

const PORT = 3001
app.listen(PORT,() => {
	console.log(`Server is running on port ${PORT}`);
})