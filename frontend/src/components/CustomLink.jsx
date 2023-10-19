import React from "react";
import Link from "next/link";

const CustomLink = ({ title }) => {
    let linkTitle, href;
  
    if (title === 'LOG IN') {
      linkTitle = 'LOG IN';
      href = '/login';
    } else if (title === 'SIGN UP') {
      linkTitle = 'SIGN UP';
      href = '/signup';
    } else if (title === 'Launch App') {
      linkTitle = 'Launch App';
      href = '/launch';
    } else {
      linkTitle = null;
      href = '/';
    }
  
    return (
      <Link href={href}>
        {linkTitle}
      </Link>
    );
  };
  
  export default CustomLink;
  
  
  
  
  
  
  