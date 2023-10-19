"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {useDisconnect, useAccount } from 'wagmi'
import { useUserTypeContext } from '@/app/context/userTypeContext';



const Sidebar = () => {
  const currentRoute = usePathname();
  const { disconnect } = useDisconnect()
  const {isDisconnected} = useAccount()
  const { userType } = useUserTypeContext();
  const router = useRouter()

  const handleLogout = () => {
    console.log("loging out", isDisconnected);
    disconnect();
    if(isDisconnected){
      router.push("/login")
    }
  }

  useEffect(()=>{
    disconnect();
  },[isDisconnected])

  const isActive = page => currentRoute.endsWith(page);
  const itemClass = page => isActive(page) ? "text-appGreen pl-8 border-4 border-black/0 border-r-appGreen" :  "text-gray-500";

  return (
    <div className="bg-appGlass text-white w-100 text-16 font-medium pt-16 pl-8 grow-0 shrink-0 w-[280px] overflow-y-auto flex flex-col">
      <div>
        <ul className="space-y-2">
          { userType === "contributor" ? 
              <>
              <li className={`p-2 mb-4 rounded ${itemClass("my-campaigns")}`}>
                <Link className="flex items-center" href="/dashboard/my-campaigns">
                <svg className="grow-0 shrink-0 mr-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15V17M12 11V17M16 7V17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My campaigns
                </Link>            
              </li>

            <li className={`p-2 rounded ${itemClass("find-campaigns")}`}>
              <Link className="flex items-center" href="/dashboard/find-campaigns">
              <svg className="grow-0 shrink-0 mr-4" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.7221 7.26596C14.2107 7.10312 14.4549 7.02169 14.6174 7.07962C14.7587 7.13003 14.87 7.24127 14.9204 7.38263C14.9783 7.54507 14.8969 7.78935 14.734 8.27789L13.2465 12.7405C13.2001 12.8797 13.1769 12.9492 13.1374 13.007C13.1024 13.0582 13.0582 13.1024 13.007 13.1374C12.9492 13.1769 12.8797 13.2001 12.7405 13.2465L8.27789 14.734C7.78935 14.8969 7.54507 14.9783 7.38263 14.9204C7.24127 14.87 7.13003 14.7587 7.07962 14.6174C7.02169 14.4549 7.10312 14.2107 7.26596 13.7221L8.75351 9.25947C8.79989 9.12033 8.82308 9.05076 8.8626 8.99299C8.8976 8.94182 8.94182 8.8976 8.99299 8.8626C9.05076 8.82308 9.12033 8.79989 9.25947 8.75351L13.7221 7.26596Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Find campaigns
              </Link>            
            </li>
          </>
              :
              <>
              <li className={`p-2 mb-4 rounded ${itemClass("review-campaigns")}`}>
                <Link className="flex items-center" href="/dashboard/review-campaigns">
                <svg className="grow-0 shrink-0 mr-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15V17M12 11V17M16 7V17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Campaigns
                </Link>            
              </li>

            <li className={`p-2 rounded ${itemClass("create-campaign")}`}>
            <Link className="flex items-center" href="/dashboard/create-campaign">
            <svg className="grow-0 shrink-0 mr-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            New campaign
            </Link>            
          </li>
          </>
          }

        </ul>
      </div>
      <div className="flex-grow"></div>
      <Separator className={'bg-gray-500 opacity-40'}/>
      <div className="p-4">
        <Button onClick={handleLogout} className="hover:text-appRed text-gray-500 text-base bg-transparent hover:bg-transparent py-2 px-4">
        <svg width="24" height="24" className='mr-3' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" stroke="#FC5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>  
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
