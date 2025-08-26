const express = require('express')
const router = require('./router')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

// app.get('/', (req, res) => {
//   res.status(200).send('Hello World!')
// })

module.exports = app;