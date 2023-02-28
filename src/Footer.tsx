import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="fixed bottom-0 pt-3 w-screen mx-auto">
      <div className="flex flex-row items-center align-center justify-between w-5/6 mx-auto mb-5">
        <div>
          <p className="text-white text-l">
            This project is open-sourced and open to contributions!
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <a
            href="https://github.com/iamlouislab/supabase-types-converter"
            target="_blank"
          >
            <div className="flex flex-row text-white text-xl align-center items-center gap-2">
              <AiFillGithub />
              Github
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
