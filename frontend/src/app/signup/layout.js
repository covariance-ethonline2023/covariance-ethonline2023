"use client"

import { redirect } from 'next/navigation'
import { NavBar } from "@/components/navbar";


const Layout = ({ children }) => { 

    const handleLogin = () => {
        redirect('/login')
     }

    const loginBtn = {
        title: "LOG IN",
        onClick: () => handleLogin
    };

    return ( 
      <> 
        <NavBar button={loginBtn} /> 
        <div className="flex items-center justify-center h-screen ">
            {children} 
        </div>
      </> 
    ); 
  }; 
    
  export default Layout;