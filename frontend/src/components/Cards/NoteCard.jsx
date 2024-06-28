import React from 'react'
import { FaRegHeart,FaHeart,FaStar, FaRegStar } from "react-icons/fa";
import moment from 'moment';
import { RiDeleteBin6Line } from "react-icons/ri";


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
    <div
       onClick={onEdit}
     className='h-52 w-36 sm:w-auto  rounded-xl p-4 bg-[#c4c4c43a] hover:shadow-2xl transition-all ease-in-out flex flex-col justify-between'>
       
       <div className='overflow-hidden'>

      
        <div className=' flex items-center justify-between '>
            <div>
                <h6 className=' text-base font-medium'>{title}</h6>
            </div>
            <div className='mr-1 '>
                {
                    openLiked&&(isPinned?<FaStar className={`icon-btn text-yellow-400 hover:text-yellow-500 hover:scale-110 transition-all ease`} onClick={(e)=>{
                            e.stopPropagation();
                        onPinNote();}}/>:<FaRegStar className={`icon-btn hover:scale-110 transition-all ease hover:text-slate-400`} onClick={(e)=>{
                            e.stopPropagation();
                        onPinNote();}}/>)

                }
            
            </div>
        </div>

        <p className=' text-xs text-slate-600 mt-2'>{content?.slice(0,180)}</p>

        </div>


        <div>

        
            <div className=' flex items-center justify-between gap-2'>
                <div className=' text-xs text-slate-500'>
    {tags.map((item,index)=>index<5&&`#${item} `)}
                </div>
               
            </div>

            <div className=' flex justify-between items-center mt-4'>
            <span className=' text-sm text-slate-700'>{moment(date).format("MMM DD, YYYY")}</span>
            <div className='flex items-center gap-4 mr-1'>
                    <RiDeleteBin6Line className='transition-all ease icon-btn hover:scale-110 hover:text-red-600'
                    onClick={(e)=>{
                        e.stopPropagation();
                        onDelete();
                    }}/>
                    {
                        isLiked?<FaHeart className={`icon-btn transition-all ease  hover:scale-110 hover:text-red-500 text-red-400 `} onClick={(e)=>{
                            e.stopPropagation();
                            onLike();
                        }}/>:<FaRegHeart className={`icon-btn  hover:text-slate-400 transition-all ease hover:scale-110 `} onClick={(e)=>{
                            e.stopPropagation();
                            onLike();
                        }}/>
                    }
                    
                    
                </div>
            </div>
        </div>

    </div>
  )
}

export default NoteCard