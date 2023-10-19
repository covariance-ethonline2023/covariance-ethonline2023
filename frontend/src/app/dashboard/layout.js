import { NavBar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { UserTypeProvider } from "../context/userTypeContext";

const Layout = ({ children }) => { 

    return (
        <div className="">
            <NavBar /> 
            <div className="flex items-stretch h-[calc(100vh-72px)] overflow-hidden "> 
               <UserTypeProvider>
                <Sidebar active={""}/> 
                </UserTypeProvider> 
                <div className="flex-1 p-32 pt-16">
                    {children}
                </div>
            </div> 
        </div> 
    ); 
  }; 
    
  export default Layout;
