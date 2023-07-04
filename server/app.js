const express= require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MODULEURI}=require('./keys')

//Q1dj8NeK4BCTSh8b


mongoose.connect(MODULEURI,{
    UseNewUrlParser:true,
    UseUnifiedTopology:true

})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err showing",err)
})

require('./Models/user')
require('./Models/post')

app.use(express.json()) 
app.use(require('./Routes/auth')) 
app.use(require('./Routes/post'))
app.use(require('./Routes/user'))

app.listen(PORT,()=>{
    console.log("the server is running at",PORT)
})

