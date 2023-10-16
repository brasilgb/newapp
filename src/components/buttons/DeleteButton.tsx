'use client'
import Link from "next/link"
import React from 'react'
import { MdDelete } from 'react-icons/md'

interface NewBtnProps {
    label: string;
    path: string;
}

const DeleteButton = ({ label, path }: NewBtnProps) => {
    return (
        <div className="">
            <Link
                className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200 font-medium rounded text-sm px-4 py-2 focus:outline-none"
                href={path}
            >
                <MdDelete size={16} />
                {label}
            </Link>
        </div>
    )
}

export default DeleteButton