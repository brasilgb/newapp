'use client';
import Link from 'next/link';
import React from 'react';
import {MdAdd} from 'react-icons/md';

interface NewBtnProps {
    label: string;
    path: string;
}

const NewButton = ({label, path}: NewBtnProps) => {
    return (
        <div className="">
            <Link
                className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-200 font-medium rounded text-sm px-4 py-2 focus:outline-none"
                href={path}
            >
                <MdAdd size={16} />
                {label}
            </Link>
        </div>
    );
};

export default NewButton;
