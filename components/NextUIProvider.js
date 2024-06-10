"use client";
import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function NextuiProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('Token');
    console.log('Token:', token);
    if (token) {
      setIsAuthenticated(true);
      if (pathname === '/Signin') {
        router.push('/');
      }
    } else {
      setIsAuthenticated(false);
      if (pathname !== '/Signin') {
        router.push('/Signin');
      }
    }
  }, [pathname, router]);

  if (isAuthenticated && pathname === '/Signin') {
    // Render nothing or a loading state while redirecting
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && pathname !== '/Signin') {
    // Render nothing or a loading state while redirecting
    return <div>Loading...</div>;
  }

  return (
    <NextUIProvider>
      <main className="flex sticky top-0">
        {pathname !== '/Signin' && (
          <div className="sticky top-0">
            <Dashboard />
          </div>
        )}
        <div className="flex flex-col w-full bg-white">
          <Navbar />
          {children}
        </div>
      </main>
    </NextUIProvider>
  );
}
