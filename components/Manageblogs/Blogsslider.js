"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Addblogs from "./Addblogs";
import Viewblogs from "./Viewblogs";

export default function Blogsslider() {
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
              <span>Add Blogs</span>
            </div>
          }
        >
          <Addblogs/>
        </Tab>
        <Tab
          key="Tent"
          title={
            <div className="flex items-center space-x-2 ml-10 ">
              <FaEye />
              <span>View Blogs</span>
            </div>
          }
        >
        <Viewblogs/>
        </Tab>
      
      </Tabs>
    </div>
  );
}
