'use client';
import Link from 'next/link';
import React from 'react';
import { IoArrowBack } from "react-icons/io5";
import {MdAdd} from 'react-icons/md';

interface NewBtnProps {
    label: string;
    path: string;
}

const BackButton = ({label, path}: NewBtnProps) => {
    return (
        <div className="mb-2">
            <Link
                className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-200 font-medium rounded text-sm px-4 py-2 focus:outline-none"
                href={path}
            >
                <IoArrowBack size={16} />
                <span className="ml-1">{label}</span>
            </Link>
        </div>
    );
};

export default BackButton;
