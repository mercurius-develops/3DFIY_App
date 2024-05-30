import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
    return (
        <div class="absolute inset-y-0 right-0 font-medium flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className='flex items-center'>
                <div className='mr-2'>
                <p className='font-semibold mt-0.5'>Faizan Tahir </p>
                <p className='text-right font-normal -mt-1'>$0</p>

                </div>

                <img className='w-10 rounded-full' src="/icon.png" alt="" />
            </div>
        </div>
    );
};