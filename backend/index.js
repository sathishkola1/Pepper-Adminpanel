const express = require('express')
require('./db/mongoose')
require('dotenv').config()
const cors = require("cors")
const userRouter = require('./routers/user')
const componentRouter = require('./routers/components')
const app = express()
const PORT = process.env.PORT
let path = require('path')
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(componentRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})

app.listen(PORT,()=>{
    console.log("server started on port : " + PORT)
})



