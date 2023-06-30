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

// ROUTER 3: Update a existing notes using : PUT"/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser , 
async(req,res)=>{
    try {
        // destructuring
        const {title, description , tag} = req.body;
        
        // creating a new object 
        const newNote = {};
        if(title){newNote.title = title}; // if title is given in request then it will add title key with title value
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        // Find the note to be updated and update it
        // chacking note id
        let note  = await Note.findById(req.params.id); // this will fetch the note from db which has same id as given in the reqest url
        // let have scope inside the block
        // checking note exist or not
        if(!note){
            return res.status(404).send("Not Found");
        } // if no note exist havinf id given in params then page note found error will br given
        
        // checking user id of this note
        // one from the notes db and other from the jwt token got using the fetchuser
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        } // user try to change someones other user data using its login
        
        //                                      note id   ,  giving the updated info , send new info
        note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote}, {new:true});
        res.json({note});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured");
    }
}) 

// ROUTER 3: Delete a existing notes using : DELETE"/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser , 
async(req,res)=>{
    try {
        // destructuring
        const {title, description , tag} = req.body;
        
        // Find the note to be deleted and delete it
        let note  = await Note.findById(req.params.id); // this will fetch the note from db which has same id as given in the reqest url
        // let have scope inside the block
        // checking note exist or not
        if(!note){
            return res.status(404).send("Not Found");
        } // if no note exist havinf id given in params then page note found error will br given
        
        // Allow the deletion only if user owns this note
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        } // user try to change someones other user data using its login
        
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted"});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured");
    }
}) 

module.exports = router