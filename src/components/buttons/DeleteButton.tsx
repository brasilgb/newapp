'use client'
import Link from "next/link"
import React from 'react'
import { MdAdd } from 'react-icons/md'

interface NewBtnProps {
    label: string;
    path: string;
}

const DeleteButton = ({ label, path }: NewBtnProps) => {
    return (
        <div className="">
            <Link
                className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                href={path}
            >
                <MdAdd size={16} />
                {label}
            </Link>
        </div>
    )
}

export default DeleteButton