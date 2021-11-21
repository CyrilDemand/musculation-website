const express = require('express')
const app = express()
const port = 3000
const exercises = [
    { id: 1, name: 'truc1' },
    { id: 2, name: "truc2" },
    { id: 3, name: "truc3" }
]

// npm install

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/programs', (req, res) => {
    res.send(exercises)
})

app.get('/programs/:id', (req, res) => {
    const id = req.params.id
    res.send(exercises.find(exercise => exercise.id == id))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})