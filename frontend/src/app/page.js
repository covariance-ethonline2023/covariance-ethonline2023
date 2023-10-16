'use client'

import { NavBar } from '@/components/navbar';
import Link from 'next/link';

export default function Home() {

  const navItems = [{path: "/network", title: "Network"}, {path: "/community", title: "Community"}, {path: "/docs", title: "Docs"}];
  
  const handleNavButtonClick = () => {
    
  };

  const buttonProps = {
    title: 'Launch App',
    onClick: handleNavButtonClick
  };
 
  return (
    <div className="flex flex-col h-screen">
      <NavBar navItems={navItems} button={buttonProps} />

      
      <div className="flex flex-1 items-center justify-center bg-cover bg-center relative">
        <div className="absolute left-0 p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Trustless collaboration for business growth.</h1>
          <p className="text-lg text-white">Your gateway to secure, expert-driven growth opportunities.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/launch">Launch App</Link>
          </button>
        </div>
      </div>
    </div>
  );
};