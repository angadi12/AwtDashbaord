import Image from "next/image";
import { BiDollarCircle } from "react-icons/bi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/hi";
import Logo2 from '../public/Logo2.png'

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen flex-col p-2  ">
      
       <Image src={Logo2} alt="logo"/>
     
    </main>
  );
}
