const mongoose = require('mongoose');
const { Schema } = mongoose; 

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // it will assign the used id to notes schema as a F.K. 
        ref: 'user' // for refrence db
    },
    title:{
        type: String,
        require : true
    },
    description:{
        type : String,
        require : true
    },
    tag:{
        type : String,
        require : true
    },
    date:{
        type : Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);