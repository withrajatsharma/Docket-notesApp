import React from 'react'
import {MdOutlinePushPin , MdCreate, MdDelete} from "react-icons/md"
import { FaHeart } from "react-icons/fa";
import moment from 'moment';


const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
    isLiked,
    onLike,
    openLiked
}) => {
  return (
    <div className='  border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className=' flex items-center justify-between'>
            <div>
                <h6 className=' text-sm font-medium'>{title}</h6>
                <span className=' text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
            </div>
            <div className='flex flex-col gap-4'>
                {
                    openLiked&&<MdOutlinePushPin className={`icon-btn ${isPinned?"text-primary":"text-slate-300"}`} onClick={onPinNote}/>

                }
            <FaHeart className={`text-xl cursor-pointer hover:text-red-500 ${isLiked?"text-red-500":"text-slate-300"}`} onClick={onLike}/>
            </div>
        </div>
        <p className=' text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

            <div className=' flex items-center justify-between gap-2'>
                <div className=' text-xs text-slate-500'>
    {tags.map((item)=>`#${item} `)}
                </div>
                <div className='flex items-center gap-2'>
                    <MdCreate className=' icon-btn hover:text-green-600'
                    onClick={onEdit}/>
                    <MdDelete className=' icon-btn hover:text-red-500'
                    onClick={onDelete}/>
                </div>
            </div>

    </div>
  )
}

export default NoteCard