const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();

const app = express()
const port = 5000

app.use(cors())  // allow external app to send data to api
app.use(express.json()) // with this we will able accept the json data to our site api in req header

// Available Routes
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/notes', require('./routes/notes')) 

if(process.env.NODE_ENV=='production'){
  const path = require('path')
  // now to deploy react application we will built it 

  app.get('/',(req,res)=>{
    // handeling the static file 
    app.use(express.static(__dirname, 'build'))
    res.sendFile(path.resolve(__dirname, 'build','index.html'))
  })
}

app.listen(port, () => {
  console.log(`MYNotebook listening on port ${port}`)
})