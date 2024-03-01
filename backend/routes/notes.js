const express = require("express");
const router = express.Router();
var fetchuser = require("../middelware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get User All Notes using GET :  GET "/api/notes/getallnotes"
router.get("/getallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }  catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// ROUTE 2 : Add a new Note using post request :  POST "/api/notes/addnotes"
router.get("/addnotes",fetchuser,
  [
    body("title", "Enter a valid name").notEmpty(),
    body("description", "Description must be of atleast 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        user: req.user.id,
      });

      const SaveNote = await note.save();
      res.json(SaveNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
      }
  }
);
// ROUTE 3 : Update the existing notes using put request :PUT "/api/notes/updatenotes"
router.get("/updatenotes/:id",fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // Create a newNote Object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !=req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set :newNote}, {new:true})
    res.json({note})
  })
// ROUTE 4 : Delete the existing notes using Delete request :Delete "/api/notes/updatenotes"
router.delete("/deletenotes/:id",fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !=req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Notes has been deleted", note : note})
  })
module.exports = router;
