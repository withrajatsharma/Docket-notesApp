
const express = require('express');
const router = express.Router();
const {addNote,editNote, getAllNotes, deleteNote,updatePinned, searchNote} = require("../controllers/notes.controller");
const {auth}  = require('../middlewares/auth.js');

router.post("/add-note",auth,addNote);
router.put("/edit-note/:noteId",auth,editNote);
router.get("/get-all-notes",auth,getAllNotes);
router.delete("/delete-note/:noteId",auth,deleteNote);
router.put("/update-pinned/:noteId",auth,updatePinned);
router.get("/search-note",auth,searchNote);



module.exports = router;