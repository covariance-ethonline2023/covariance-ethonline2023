import { NavBar } from "@/components/navbar";

const Layout = ({ children }) => { 

    return ( 
      <> 
        <NavBar /> 
        {children} 
      </> 
    ); 
  }; 
    
  export default Layout;