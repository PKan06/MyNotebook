 const mongoose = require('mongoose');
 const {mongoURI} =  require('./config/keys');

 const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongoURI) 
        console.log('Connected to Mongo Succesfully!!! ')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;