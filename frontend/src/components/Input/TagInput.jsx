import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags,setTags}) => {

        const [inputValue, setInputValue] = useState("");

        const handleInputChange = (e) => {
            setInputValue(e.target.value);
        };

        const addNewTag = () => {
            if (inputValue.trim() !== "") {
                setTags([...tags, inputValue.trim()]);
                setInputValue("");
            }
        };

        const handleKeydown = (e) => {
            if (e.key === "Enter") {
               tags.length<5&&addNewTag();
            }
        };

        const handleRemoveTag = (tagToRemove) => {
            setTags(tags.filter((tag)=> tag!==tagToRemove))
        };

  return (
    <div>

        {tags && (<div className='flex items-center gap-2 flex-wrap mt-2'>
            {
                tags.map((tag,index)=>(
                    <span key={index} className=' flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                        # {tag}
                        <button onClick={()=>{handleRemoveTag(tag)}}>
                            <MdClose/>
                        </button>
                    </span>
                ))
            }
        </div>)}

        <div className=' flex items-center gap-4 mt-3'>
            <input type="text"
                className=' text-sm bg-transparent border px-3 py-2 rounded outline-none'
                value={inputValue}
                placeholder='Add Tags'
                onChange={handleInputChange}
                onKeyDown={handleKeydown}
            />

            <button
            onClick={()=>{
                tags.length<5&&addNewTag();
            }}
            className=' group w-8 h-8 flex items-center justify-center rounded border border-primary hover:bg-primary'>
                <MdAdd className=" text-2xl text-textclr  group-hover:text-white"/>
            </button>
        </div>
    </div>

  )
}

export default TagInput