
const express = require('express');
const router = express.Router();
const {addNote,editNote, getAllNotes, deleteNote,updatePinned, searchNote, updateLiked, getLikedNotes} = require("../controllers/notes.controller");
const {auth}  = require('../middlewares/auth.js');

router.post("/add-note",auth,addNote);
router.put("/edit-note/:noteId",auth,editNote);
router.get("/get-all-notes",auth,getAllNotes);
router.delete("/delete-note/:noteId",auth,deleteNote);
router.put("/update-pinned/:noteId",auth,updatePinned);
router.get("/search-note",auth,searchNote);
router.put("/update-liked/:noteId",auth,updateLiked);
router.get("/get-liked-notes",auth,getLikedNotes);


module.exports = router;