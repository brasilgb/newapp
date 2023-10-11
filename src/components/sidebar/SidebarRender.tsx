'use client'
import Image from "next/image"
import React, { useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs';
import SideNavigation from "./SideNavigation";

const SidebarRender = () => {

    const [open, setOpen] = useState(true);
    return (
        <div className={`${open ? 'w-64' : 'w-16'} relative p-3 duration-300 bg-blue-dark`}>

            <div className="inline-flex items-center mb-3">
                <span className={`w-10 h-10 rounded-full cursor-pointer float-left mr-2 duration-500`}>
                    <Image src={require('@/assets/images/profile.jpg')} alt="Profile" className="w-10 h-10" />
                </span>
                <span className={`text-white origen-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>
                    <h1 className="text-2xl text-white">Profile</h1>
                </span>
            </div>
            <SideNavigation opened={open} />
            <div>
                <BsArrowLeftShort
                    size={26}
                    onClick={() => setOpen(!open)}
                    className={`${open ? 'rotate-0' : 'rotate-180'
                        } duration-300 absolute cursor-pointer bg-blue-dark border-2 border-white text-gray-light rounded-full text-3xl -right-3 bottom-3`}
                />
            </div>
        </div>

    )
}

export default SidebarRender