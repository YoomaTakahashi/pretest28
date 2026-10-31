require('dotenv').config({path:'.env'})
const cors = require('cors')
const express = require('express')
const fileUp = require('express-fileupload')
const path = require('path')
const app = express()

app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(fileUp())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const profile = require('./routes/profile')
app.use('/api/profile',profile)

const docnoe = require('./routes/docnoe')
app.use('/api/docnoe',docnoe)

const dash = require('./routes/dash')
app.use('/api/dash',dash)

//----------------------------------------------------------------- eva api -----------------------------------------------------------------------
const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)

const score_commit = require('./routes/Eva/score_commit')
app.use('/api/Eva/score_commit',score_commit)

//----------------------------------------------------------------- staff api --------------------------------------------------------------

const doc = require('./routes/Staff/doc')
app.use('/api/Staff/doc',doc)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const round = require('./routes/Staff/round')
app.use('/api/Staff/round',round)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)


app.use((req,res)=> res.status(404).json({message:"Route Not found"}))
app.listen(3001,()=>{

    console.log("Server Runing on Port");
    

})