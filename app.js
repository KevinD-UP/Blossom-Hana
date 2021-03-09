const express = require('express')
app = express()

require('dotenv').config()
app.set('view engine', 'ejs')
app.use('/', require('./routes/login.routes'))
app.use(express.static(__dirname))

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log(`Listening on Port: ${PORT}`)
})

