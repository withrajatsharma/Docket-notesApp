import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose} from "react-icons/io"

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {


  return (
    <div className=' w-[40%] flex items-center px-5 py-1 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  rounded-lg'>
        <input type="text"
            placeholder='Search Notes'
            className=' w-full text-sm bg-transparent py-[11px] outline-none'
            value={value}
            onChange={onChange}
        />

      { value &&  <IoMdClose className=' text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch}/>}

        <FaMagnifyingGlass className=" text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch}/>

    </div>
  )
}

export default SearchBar