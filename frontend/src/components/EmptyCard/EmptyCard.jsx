import React from 'react'
import Loading from '../Loading/Loading'

const EmptyCard = ({imgSrc,message,loading}) => {
  return (
   loading?<Loading />: <div className=' flex flex-col items-center justify-center'>

      <img src={imgSrc} alt="" className=' opacity-75 w-60' />

        <p className=' px-80 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
          {message}
        </p>
    </div>

  )
}

export default EmptyCard