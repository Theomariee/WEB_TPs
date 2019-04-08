const express = require('express')
const v1 = require('./routes/v1/routes.js')

const app = express()

app.use('/v1', v1)

app.listen(3000)