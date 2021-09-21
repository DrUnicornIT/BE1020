const express = require('express')
const Data = require('./models/dbHelper')
const bcrypt = require('bcrypt')

const server = express()
server.use(express.urlencoded({extended: false}))
server.use(express.json())
const PORT = 5000

server.get('/', (req, res) => {
    res.json({error: 0, list: 'Okii im fine'})
})

server.post('/registrations', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        Data.add(req.body.username, req.body.displayed_name, hashedPassword)
        .then(data => {
            res.json({error: 0})
        })
        .catch(error => {
            res.json({error: 1})
        })
    } catch {
        res.json({error: 1})
    }
})

server.get('/registrations', (req, res) => {
    Data.find()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json({error: 1})
    })
})

server.listen(PORT, () => {
    console.log(` \n Server running on port ${PORT}`)
})