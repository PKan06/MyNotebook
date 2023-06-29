const express = require('express');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// ROUTER 1: fetching all notes using : GET"/api/notes/fetchallnotes" .Login required
router.get('/fetchallnotes', fetchuser ,
async (req, res)=>{
    try {
        const notes = await Note.find({user : req.user.id}); // user is the forigen key for the notes 
        // user specify whom these notes belong to
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured");
    }
});

// ROUTER 2: Add new notes using : POST"/api/notes/addnote". Login required 
var Validaton_notes_schema = [
    
    // using express validator
    body('title', ' Enter a valid title').isLength({min : 3}),
    body('description',"Description must be atleast 5 characters").isLength({min : 5}),
];
router.post('/addnote',fetchuser,Validaton_notes_schema,
async(req,res)=>{
    try {
        const {title, description , tag} = req.body; // which is given by route1
        const error = validationResult(req); // validate using the express validator after fetchuser in this route

        if(!error.isEmpty()){
            // if error is there then it will say that it is not empty so we have put ! in front of it
            return res.status(400).json({error: errors.array()});
        }
        // new Notes has been created
        const note = new Note({
            title, description , tag , user : req.user.id,
        })
        // new Notes to db
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured");
    }
});
module.exports = router