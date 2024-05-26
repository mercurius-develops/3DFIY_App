import React from 'react';

function LandingPage() {
    return (
        <body className="font-['Poppins']">

            <nav className="">
                <div className="mx-auto max-w-7xl mt-2">
                    <div className="flex h-16 items-center">

                        <div className="flex flex-1 items-center justify-between  sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="#" className="text-2xl text-green-600 font-semibold">3Dify</a>
                            </div>
                            <div className="flex w-full justify-center ml-8">
                                <div className="flex ">
                                    <a href="#" className="px-3 py-2 text-gray-900 text-base font-medium">About us</a>
                                    <a href="#" className="px-3 py-2 text-base font-medium">Design Library</a>
                                    <a href="#" className="px-3 py-2 text-base font-medium ">Printers Hub</a>
                                    <a href="#" className="px-3 py-2 text-base font-medium">Custom Orders</a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 font-medium flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <a href='/login' className="py-2 px-4 bg-[#539e60] text-white rounded-[8px] font-medium">Get started</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="relative isolate ">
                <div className="flex mx-auto max-w-7xl py-48">
                    <div className="text-left">
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Join 3Dify - <br/>
                            Design. Print. Create.</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Library with over exclusive 10,000 3D Models, <br/>
                            1,000+ Designers worldwide and 100+ Local Printers</p>
                        <div className="mt-10 flex items-center  gap-x-4">
                            <a href="#" className="rounded-md py-2 px-4 bg-[#539e60] text-sm font-medium text-white">Connect with
                                Designers</a>
                            <a href="#" className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white">Print Models</a>
                        </div>
                    </div>
                    <div className="mx-auto flex flex-col -mt-12 w-80 h-72 bg-[#95be9c] items-center rounded-3xl">
                        <h3 className=" mt-6 font-semibold text-gray-800">Get Free Printing Cost Estimation</h3>
                        <a href="#">
                            <div className="mt-4 bg-gray-600 rounded-3xl text-center p-7 w-64 h-48 flex flex-col">
                                <p className="text-white text-[64px]">+</p>
                                <p className="text-white text-xs font-medium">Upload File to Get Started</p>
                                <p className="text-white text-[8px] font-light mt-2">Files accepted: *.stl. Maximum size: 32 MB.</p>
                            </div>
                        </a>
                        <div className="flex flex-col mt-12 w-80 h-48 bg-[#95be9c] items-center rounded-3xl">
                            <p className="text-sm mt-6 text-gray-800">Place Custom Print Orders Now! Or <br/>
                                Explore ready-made items</p>
                            <div className="mt-4 flex items-center gap-x-2 mb-6">
                                <a href="#" className="rounded-md bg-[#539e60] w-32 py-2 text-center text-sm font-regular text-white">Order
                                    Now</a>
                                <a href="#" className="rounded-md bg-gray-600 w-32 text-center py-2 text-sm font-regular text-white">Explore</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                asd
            </div>

        </body>

    );
}

export default LandingPage;