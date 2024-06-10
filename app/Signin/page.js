"use client";
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  Spinner,
  Divider,
} from "@nextui-org/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Logo2 from "../../public/Logo2.png";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Page() {
  const router =useRouter()
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    role:'admin'
  });
  const [loginLoading, setLoginLoading] = useState(false);

 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/awt/user/Adminlogin",
        loginFormData
      );
      console.log("Login Successful", response.data);
      setCookie("Token", response.data.token);
      setLoginLoading(false);
      router.push('/')

      // You can add further actions upon successful login, like redirecting to another page or storing the token in local storage.
    } catch (error) {
      console.error("Login Error", error.response.data);
      toast.error(error.response.data.message);
      // You can handle login errors here, like showing an error message to the user.
      setLoginLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginFormData({ ...loginFormData, [name]: value });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-24 ">
      <Card className="max-w-full w-[400px] h-[350px]">
        <CardBody className="overflow-hidden">
          <form
            className="flex flex-col gap-4 items-center "
            onSubmit={handleLogin}
          >
            <Image className="w-32 h-16" src={Logo2} alt="logo" />
            <Divider />
            <Input
              autoFocus
              isRequired
              name="email"
              type="email"
              value={loginFormData.email}
              onChange={(e) => handleInputChange(e)}
              endContent={
                <IoMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Input
              isRequired
              name="password"
              value={loginFormData.password}
              onChange={(e) => handleInputChange(e, "login")}
              endContent={
                <FaLock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="submit"
                fullWidth
                className=" bg-[#FF7143] text-white font-bold w-60 mt-4"
              >
                {loginLoading ? (
                  <Spinner color="default" size="small" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
