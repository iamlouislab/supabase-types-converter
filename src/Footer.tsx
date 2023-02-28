import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-2">
        <a href="/">
          <AiFillGithub />
        </a>
        <a href="/">Github</a>
      </div>
    </div>
  );
};

export default Footer;
