import Blogsslider from '@/components/Manageblogs/Blogsslider'
import React from 'react'

export default function page() {
  return (
    <div className='bg-white m-2 w-[98%] mx-auto h-auto rounded-sm shadow-md p-2 flex flex-col '>
      <div>
       <Blogsslider/>
      </div>
    </div>
  )
}
