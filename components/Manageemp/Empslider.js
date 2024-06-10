"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdPeople } from "react-icons/io";

export default function Empslider() {
  return (
    <div className="flex w-full flex-col  ">
      <Tabs
        aria-label="Options"
        classNames={{
          tabList:"gap-6 md:w-full  relative rounded-lg p-1 bg-black text-white ",
          cursor: "w-full bg-[#FF7143]",
          tab: " px-2 h-8 items-center  ",
          tabContent:"group-data-[selected=true]:text-white text-white w-full group-data-[selected=true]:items-center",
        }}
        variant="bordered"
      >
        <Tab
          key="Hotel"
          title={
            <div className="flex items-center space-x-2 ml-10 ">
              <IoMdAddCircleOutline />
              <span>Add Employee</span>
            </div>
          }
        >
          {/* <Addjobs/> */}
        </Tab>
        <Tab
          key="Tent"
          title={
            <div className="flex items-center space-x-2 ml-10 ">
              <FaEye />
              <span>View Employee</span>
            </div>
          }
        >
         {/* <Viewjobs/> */}
        </Tab>
        <Tab
          key="Bunglow"
          title={
            <div className="flex items-center space-x-2 ml-10 ">
              <BiSolidPencil />
              <span>Update Employee Details</span>
            </div>
          }
        >
          {/* <Updatejobs/> */}
        </Tab>
       
      </Tabs>
    </div>
  );
}
