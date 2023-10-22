"use client"

import { redirect } from 'next/navigation'
import { NavBar } from "@/components/navbar";


const Layout = ({ children }) => { 

    const handleSignUp = () => {
        redirect('/signup')
     }

    const signUpBtn = {
        title: "SIGN UP",
        onClick: () => handleSignUp
    };

    return ( 
      <> 
        <NavBar button={signUpBtn} /> 
        <div className="flex items-center justify-center h-screen ">
            {children} 
        </div>
      </> 
    ); 
  }; 
    
  export default Layout;