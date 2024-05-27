import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navlinks = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div class="border-b border-t py-3 flex flex-row gap-12">
            <a class="font-medium" href="">Models</a>
            <a class="font-medium" href="">3D Designers</a>
            <a class="font-medium" href="">Custom Orders</a>
            <a class="font-medium" href="">Printers</a>
            <a class="font-medium" href="">Price Estimation</a>
        </div>
    );
};




