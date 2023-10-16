
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"


export const NavBar = ({navItems, button}) => {


  return (
      <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="../images/logo.svg" width={145} height={24}/>
          <div className="flex-1 flex justify-center">
            <ul className="flex space-x-4">
                {navItems && navItems.map((link, index) => (
              <li key={index}>
                    <Link href={link.path}>
                        {link.title}
                    </Link>
                </li>
                ))}
            </ul>
          </div>
        </div>

       {button && 
      <Button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={button.onClick}> 
          {button.title === "LOG IN"  ? 
          <Link href={"/login"}>{button.title}</Link> : 
          button.title === "SIGN UP" ? 
          <Link href={"/signup"}>{button.title}</Link> : 
          button.title}
      </Button>}
      </nav>
  );
};