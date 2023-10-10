'use client'
import Image from "next/image"
import React, { useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs';
import SideNavigation from "./SideNavigation";

const SidebarRender = () => {

    const [open, setOpen] = useState(true);
    return (
        <div className={`${open ? 'w-[280px]' : 'w-20'}  p-3 -translate-x-full transform bg-blue-dark transition-transform duration-150 ease-in md:translate-x-0`}>
            <div>
                <BsArrowLeftShort
                    onClick={() => setOpen(!open)}
                    className={`${open ? 'rotate-0' : 'rotate-180'
                        } duration-300 absolute cursor-pointer bg-white border-4 border-primary-blue text-primary-blue rounded-full text-3xl -right-3 top-3`}
                />
            </div>
            <div className="inline-flex items-center">
                <div className={`w-10 h-10 rounded-full cursor-pointer float-left mr-2 duration-500 ${open && 'rotate-[360deg]'}`}>
                    <Image src={require('@/assets/images/profile.jpg')} alt="Profile" className="w-10 h-10" />
                </div>
                <div className={`text-white origen-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>
                    <h1 className="text-2xl text-white">Profile</h1>
                </div>
            </div>
            <SideNavigation opened={open} />
        </div>
    )
}

export default SidebarRender