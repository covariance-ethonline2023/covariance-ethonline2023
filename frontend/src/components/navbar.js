
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import CustomLink from './CustomLink';


export const NavBar = ({navItems, button}) => {

  return (
      <nav className="bg-appGlass text-white p-4 pl-8 flex items-center justify-between h-[72px]">
        <div className="flex items-center">
          <Image alt="covariance" src="../images/logo.svg" width={145} height={24} priority />
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
          <CustomLink title={button.title}/>
      </Button>}
      </nav>
  );
};
