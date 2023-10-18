import { NavBar } from "@/components/navbar";
import { UserTypeProvider } from "../context/userTypeContext";

const Layout = ({ children }) => { 

    return ( 
      <> 
        <NavBar /> 
        <UserTypeProvider>
        {children}
        </UserTypeProvider> 
      </> 
    ); 
  }; 
    
  export default Layout;