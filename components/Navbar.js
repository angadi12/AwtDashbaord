import Image from 'next/image';
import React from 'react'
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Logo from '../public/Logo2.png'


const Navbar = () => {
  return (
    <nav className='h-12 w-full flex p-1 lg:p-8 items-center justify-between sticky top-0 z-50 bg-white border-b-1 border-gray-200'>
        <div>
        <Image src={Logo} className='object-contain h-10 w-32' alt='logo'/>
        </div>
        <div className='flex items-center gap-2 p-1 '>
        <IoNotificationsCircleOutline size={30} className='text-lg text-indigo-950' />
        <IoChatbubbleEllipsesOutline size={24}/>

        </div>
    </nav>
  )
}

export default Navbar