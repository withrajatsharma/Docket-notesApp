import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddEditNotes = ({getAllNotes,noteData,type,onClose,setLoading,showToastMessage}) => {

    const navigate = useNavigate();

    const [title,setTitle] = useState(noteData?.title);
    const [content,setContent] = useState(noteData?.content);
    const [tags,setTags] = useState(noteData?.tags||[]);

    const [error,setError] = useState(null);

    const addNewNote = async () => {

        setLoading(true);

        try {

            const response = await axiosInstance.post("/note/add-note",{
                title: title,
                content: content,
                tags: tags,
            });

            if(response.data){
                showToastMessage("Note added successfully")
                // navigate("/dashboard");
                getAllNotes();
                onClose();
            }

            
        } catch (error) {

            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
            
        }
    setLoading(false);

    };
    const editNote = async () => {

        setLoading(true);

        try {

            const response = await axiosInstance.put(`/note/edit-note/${noteData._id}`,{
                title: title,
                content: content,
                tags: tags,
            });

            if(response.data){
                // console.log(response.data);
                showToastMessage("Note updated successfully")

                getAllNotes();
                onClose();
            }

            
        } catch (error) {

            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
            
        }

        setLoading(false);


    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter a title");
            return;

        }
        if (!content) {
            setError("Please enter the content");
            return;
        }
        setError("");

        if(type === "edit") {
            editNote();

        }
        else{
            addNewNote();
        }
    };

  return (
    <div className=' relative '>

        <button className=' w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 hover:bg-slate-100 -right-3 ' onClick={onClose}>
            <MdClose className=' text-xl text-primary'/>
        </button>


        <div className=' flex flex-col gap-2'>
            <label className=' input-label'>TITLE</label>
            <input type="text"
            className=' text-2xl text-slate-950 outline-none'
            placeholder='Grocery'
            value={title}
            onChange={({target})=>setTitle(target.value)}
            />

        </div>

        <div className=' flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
           <textarea
           className='p-2 text-sm text-slate-950 outline-none bg-slate-50 rounded'
           type='text'
           placeholder='items'
           rows={10}
           value={content}
           onChange={({target})=>setContent(target.value)}
           />
        </div>

        <div className=' mt-3'>
            <label className=' input-label'>TAGS</label>

            <TagInput tags={tags} setTags={setTags} />

        </div>

        {
            error&& <p className=' text-red-500 text-xs pt-4'>{error}</p>
        }

        <button className=' btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
            {type==="edit"?"UPDATE":"ADD"}
        </button>

    </div>

  )
}

export default AddEditNotes