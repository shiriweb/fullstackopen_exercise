const express = require('express')

// adding cors
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json()) 

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Info page
app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()
  res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
})
// Info page
app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()
  res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
})

// Get a single person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) res.json(person)
  else res.status(404).json({ error: 'Person not found' })
})
// Get a single person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) res.json(person)
  else res.status(404).json({ error: 'Person not found' })
})

// Delete a person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})
// Delete a person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// Add a new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
// Add a new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' })
    return res.status(400).json({ error: 'name or number missing' })
  }

  if (persons.find(p => p.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  if (persons.find(p => p.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: (Math.floor(Math.random() * 1000000)).toString(),
    id: (Math.floor(Math.random() * 1000000)).toString(),
    name,
    number
  }
    number
  }

  persons.push(newPerson)
  res.json(newPerson)
})

// Middleware for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})
  persons.push(newPerson)
  res.json(newPerson)
})

// Middleware for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

const PORT = 3001
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  console.log(`Server running on port ${PORT}`)
})
