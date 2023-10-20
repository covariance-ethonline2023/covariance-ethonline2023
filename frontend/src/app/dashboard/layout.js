import { NavBar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const Layout = ({ children }) => { 

    return (
        <div className="">
            <NavBar /> 
            <div className="flex items-stretch h-[calc(100vh-72px)] overflow-hidden "> 
                <Sidebar active={""}/> 
                <div className="flex-1 p-32 pt-16">
                    {children}
                </div>
            </div> 
        </div> 
    ); 
  }; 
    
  export default Layout;
