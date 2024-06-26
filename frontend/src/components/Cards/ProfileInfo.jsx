import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo}) => {
  return (

    <div>
    <div className='flex items-center gap-3 ml-5'>
            <div className=' w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium bg-secondary'>{
                getInitials(userInfo?.fullName)
                }</div>
            <div>
                <p className=' text-base font-medium '>{userInfo?.fullName}</p>
               
         
            </div>
    </div>
    </div>
  )
}

export default ProfileInfo