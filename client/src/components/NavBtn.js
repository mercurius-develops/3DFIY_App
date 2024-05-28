import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NavBtn = () => {
    return (
        <div class="absolute inset-y-0 right-0 font-medium flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button class="py-2 px-4 w-32 bg-[#539e60] text-white rounded-[8px] font-medium">
                Login
            </button>
            <button class="py-2 px-4 w-32 bg-gray-600 text-white rounded-[8px] font-medium">
                Sign Up
            </button>
        </div>
    );
};






