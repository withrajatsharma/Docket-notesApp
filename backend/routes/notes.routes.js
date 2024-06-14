
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../utilities')

const {addNote,editNote, getAllNotes, deleteNote,updatePinned, searchNote} = require("../controllers/notes.controller");

router.post("/add-note",authenticateToken,addNote);
router.put("/edit-note/:noteId",authenticateToken,editNote);
router.get("/get-all-notes",authenticateToken,getAllNotes);
router.delete("/delete-note/:noteId",authenticateToken,deleteNote);
router.put("/update-pinned/:noteId",authenticateToken,updatePinned);
router.get("/search-note",authenticateToken,searchNote);



module.exports = router;