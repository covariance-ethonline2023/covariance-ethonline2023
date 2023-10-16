"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {useDisconnect } from 'wagmi'



const Sidebar = () => {
  const currentRoute = usePathname();
  const { disconnect } = useDisconnect()

  return (
    <div className="bg-gray-800 text-white w-72 h-[calc(100vh-56px)] overflow-y-auto flex flex-col">
      <div className="p-4">
        <ul className="space-y-2">
          <li className={`p-2 rounded ${currentRoute === "/dashboard" ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" :  "hover:bg-indigo-50 text-gray-600"}`}>
            <Link href="/dashboard">
            My Campaigns
            </Link>            
          </li>
          <li className={`p-2 rounded ${currentRoute === "/dashboard/find-campaigns" ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" :  "hover:bg-indigo-50 text-gray-600"}`}>
            <Link href="/dashboard/find-campaigns">
            Find Campaigns
            </Link>            
          </li>
        </ul>
      </div>
      <div className="flex-grow"></div>
      <div className="p-4">
        <button onClick={()=> disconnect()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
