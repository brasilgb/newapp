'use client'
import Image from "next/image"
import React from 'react'
import { navlinks } from "./navlinks"
import Link from "next/link"

const Profile = () => {
    return (
        <div className="flex items-center justify-start border-b mb-3 pb-3">
            <div className="w-10 h-10 mr-3">
                <Image src={require('@/assets/images/profile.jpg')} alt="Profile" />
            </div>
            <div className="">
                <h1 className="text-2xl">Profile</h1>
            </div>
        </div>
    )
}

export default Profile