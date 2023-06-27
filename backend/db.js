 const mongoose = require('mongoose');
 const mongoURI = "mongodb://localhost:27017/mynotebook?directConnection=true"

 const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Connected to Mongo Succesfully!!! ')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;