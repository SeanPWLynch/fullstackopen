const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Arto Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    //Validate contents
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    //Check if name already exists
    if (!persons.some(person => person.name === body.name)) {
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number
        }

        persons = persons.concat(person)

        response.json(person)
    }
    else {
        response.status(409).json(
            {
                error: "Resource already exists"
            }
        )
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(
        `
        <p>Phonebook has ${persons.length} people</p>
        <p>${new Date(Date.now())}</p>
        `
    )
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on post ${PORT}`)
})