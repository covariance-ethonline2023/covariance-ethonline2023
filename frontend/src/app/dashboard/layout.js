import { NavBar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const Layout = ({ children }) => { 

    return (
        <div className="">
            <NavBar /> 
            <div className="flex h-[calc(100vh-56px)] overflow-hidden "> 
            <Sidebar active={""}/> 
            <div className="flex-1 bg-gray-100 p-8">
                {children}
            </div>
        </div> 
      </div> 
    ); 
  }; 
    
  export default Layout;