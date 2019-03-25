var express = require('express')

var app = express()
const users = [
    {
        nom: 'Patrick',
        age: 55
    },
    {
        nom: 'Jean-Louis',
        age: 32
    }
]

app.get('/users', function(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(JSON.stringify(users))
})

app.listen(3000)