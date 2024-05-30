import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navlinks } from "./Navlinks";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav class="">
      <div class="mx-auto max-w-7xl mt-2">
        <div class="flex h-16 items-center">
          <div class="flex flex-1 items-center justify-between  sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <a href="/" class="text-2xl text-[#539e60] font-semibold">
                3Dify
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
