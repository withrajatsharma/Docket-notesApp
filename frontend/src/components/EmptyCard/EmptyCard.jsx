import React from 'react'
import Loading from '../Loading/Loading'

const EmptyCard = ({imgSrc,message,loading}) => {
  return (
   loading?<Loading />: <div className=' flex flex-col items-center justify-center mt-32'>

      <img src={imgSrc} alt="" className=' w-60' />

        <p className=' w-[40%] text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
          {message}
        </p>
    </div>

  )
}

export default EmptyCard