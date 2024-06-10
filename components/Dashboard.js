"use client" 
import React from 'react'
import {VscDashboard} from "react-icons/vsc"
import {AiOutlineRight} from "react-icons/ai"
import {RxDashboard} from "react-icons/rx"
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SiGoogletagmanager } from "react-icons/si";

import Image from 'next/image'
import Logo1 from "../public/Logo1.png"
import { useRouter,usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'

const Dashboard = () => {
   const pathname=usePathname()
   const router = useRouter()


const active='flex justify-between  items-center bg-[#FF7143]  p-1 lg:p-2 rounded-md cursor-pointer text-white'
const unactive='flex justify-between  items-center   p-1 lg:p-2 rounded-md cursor-pointer bg-black text-white'

  return (
    <div  style={{position:"sticky",top:0}} className='hidden h-[100vh]   bg-black p-4 w-12 lg:w-60 lg:flex lg:flex-col justify-between'>
       <div className='flex flex-col gap-8 p-1 lg:p-2 '>
          <div className='flex flex-col justify-start items-start gap-2 '>
          <Image className='w-24 h-10' src={Logo1} alt='logo'/>
          <p className='text-white text-xs'>ANGADI WORLD TECHNOLOGIES </p>


          </div>
         <div className='flex flex-col gap-2 text-white'>
            <Button onClick={() => router.push('/')} className={pathname == "/" ? active : unactive}>
               <div className='flex items-center gap-2'>
                <RxDashboard /> 
                <p  className=' text-xs font-medium cursor-pointer'>Dashboard</p>
               </div>
            <AiOutlineRight className='font-medium text-xs'/>
            </Button>

            <Button onClick={() => router.push('/Addjobs')} className={pathname == "/Addjobs" ? active : unactive}>
               <div className='flex items-center gap-2'>
                <IoMdAddCircleOutline /> 
                <p  className='font-medium text-xs cursor-pointer'>Manage Jobs</p>
               </div>
            <AiOutlineRight className='text-xs'/>
            </Button>

            <Button onClick={() => router.push('/Addblogs')} className={pathname == "/Addblogs" ? active : unactive}>
               <div className='flex items-center gap-2'>
                <IoMdAddCircleOutline /> 
                <p  className='font-medium text-xs cursor-pointer'>Blogs</p>
               </div>
            <AiOutlineRight className='text-xs'/>
            </Button>

            <Button onClick={() => router.push('/Manageemployee')} className={pathname == "/Manageemployee" ? active : unactive}>
               <div className='flex items-center gap-2'>
                <IoMdAddCircleOutline /> 
                <p  className='font-medium text-xs cursor-pointer'>Employee Details</p>
               </div>
            <AiOutlineRight className='text-xs'/>
            </Button>

           
           
         </div>

       </div>
       {/* <div className='flex items-center justify-between bg-indigo-500 p-2 rounded-md'>
        <div className='flex items-center gap-2'>
          <Image src={pic} className='h-8 w-8 rounded-full'/>
          <div className='flex flex-col items-start justify-start '>
            <span className='text-xs text-white font-semibold'>Santosh </span>
            <span className='text-xs text-gray-300'>developer</span>
          </div>
        </div>
        <AiOutlineRight className='text-xs text-white'/>
       </div> */}
    </div>
  )
}

export default Dashboard