const mongoose = require('mongoose');
const { Schema } = mongoose; 

const UserSchema = new Schema({
    name:{
        type: String,
        require : true
    },
    email:{
        type : String,
        require : true,
        unique: true
    },
    password:{
        type : String,
        require : true
    },
    date:{
        type : Date,
        default: Date.now
    },
});

// UserSchema.index({name: 1, email : 1, password : 1},{unique: true});   // identify  the unique entry all 1
const User = mongoose.model('user',UserSchema);
User.createIndexes(); // identify only the unique entry of email
module.exports = User;