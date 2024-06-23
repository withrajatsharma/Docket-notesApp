const noteModel = require("../models/note.model");

const addNote = async (req,res)=>{
    try {

            const {title,content,tags} = req.body;

            const userId = req.user.user._id;
            

            if(!title || !content){
               return  res.status(500).json({
                    success: false,
                    message:" title and content are required",
                    // error:error.message
                });
            }

            const createdNote = await noteModel.create({
                title,
                content,
                tags:tags || [],
                userId
            });

            return res.status(200).json({
                success:true,
                createdNote,
                message:"note created successfully"
            });


        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while adding a note ",
            error:error.message
        });
        
    }
};

const editNote = async (req,res) => {
    try {

        const noteId = req.params.noteId;

        const userId = req.user.user._id; 

        const {title, content, tags, isPinned} = req.body;

        if(!title&&!content&&!tags ){
            return res.status(500).json({
                success: false,
                message:" no changes were provided ",
                // error:error.message
            });
        }

        const note = await noteModel.findOne({_id:noteId,userId:userId})

        if(!note){
            return res.status(500).json({
                success: false,
                message:" note not found ",
                // error:error.message
            });
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            success: true,
            note,
            message:" note updated successfully "
        });
       
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while editing a note",
            error:error.message
        });
        
    }
};

const getAllNotes = async (req,res) =>{

    try {

            const userId = req.user.user;

            const notes = await noteModel.find({userId}).sort({isPinned:-1});

            return res.status(200).json({
                success: true,
                notes,
                message:" got all notes successfully"
            });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while getting all notes",
            error:error.message
        });
        
    }

};

const deleteNote = async (req, res) => {

    try {

        const userId = req.user.user._id;
        const noteId = req.params.noteId;

        const note = await noteModel.findOne({ _id: noteId, userId: userId });

        if (!note) {
            return res.json({
                success: false,
                message:" note not found",
            })
        }
        await noteModel.deleteOne({ _id: noteId, userId: userId});

        return res.status(200).json({
            success: true,
            message: "note deleted successfully ",
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while deleting a note",
            error:error.message
        });
    }

};

const updatePinned = async (req, res) => {
    try {

        const noteId = req.params.noteId;

        const userId = req.user.user._id; 

        const { isPinned} = req.body;


        const note = await noteModel.findOne({_id:noteId,userId:userId})

        if(!note){
            return res.status(500).json({
                success: false,
                message:" note not found ",
                // error:error.message
            });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            success: true,
            note,
            message:" note pinned change successfully "
        });


        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while updating pinned option in note",
            error:error.message
        });
        
    }
};

const updateLiked = async (req,res) => {
    try {

        const noteId = req.params.noteId;

        const userId = req.user.user._id; 

        const { isLiked } = req.body;


        const note = await noteModel.findOne({_id:noteId,userId:userId})

        if(!note){
            return res.status(500).json({
                success: false,
                message:" note not found ",
                // error:error.message
            });
        }

        note.isLiked = isLiked;

        await note.save();

        return res.status(200).json({
            success: true,
            note,
            message:" note liked change successfully "
        });



        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while updating liked option in note",
            error:error.message
        });
        
    }
}

const getLikedNotes = async (req, res) => {
    try {

        const userId = req.user.user._id; 

        const notes = await noteModel.find({userId,isLiked:true});

        return res.status(200).json({
            success: true,
            notes,
            message:" got all liked notes successfully"
        });


        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while fetching liked notes",
            error:error.message
        });
        
    }
};


const searchNote = async (req, res) => {


    try {

        const userId = req.user.user._id; 

        const {query} = req.query;

        if(!query){
            return res.status(500).json({
                success: false,
                message:" search query is required ",
                // error:error.message
            });
        }

        const matchingNotes = await noteModel.find({userId: userId,$or:[
            {title:{$regex: new RegExp(query,"i")}},{content:{$regex: new RegExp(query,"i")}}
        ],});

        return res.status(200).json({
            success: true,
            matchingNotes,
            message:" notes matching serach query retrived successfully "
        });




        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error occured while searching the note ",
            error:error.message
        });
        
    }


};


module.exports = {getLikedNotes,addNote,editNote,getAllNotes,deleteNote,updatePinned, searchNote, updateLiked};