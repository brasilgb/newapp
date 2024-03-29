'use client';
import Link from 'next/link';
import React from 'react';
import {BiEdit} from 'react-icons/bi';

interface NewBtnProps {
    label: string;
    path: string;
    btnLink?: boolean;
    name: string;
}

const EditButton = ({label, path, btnLink = false, name}: NewBtnProps) => {
    return (
        <div className="">
            <Link
                className={`
                ${btnLink
                ? 'text-gray-500 underline'
                : 'flex items-center justify-center text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-200 font-medium rounded text-sm px-4 py-2 focus:outline-none'
                }
                `}
                href={path}
                title={`Editar ${name}`}
            >
                {!btnLink && <BiEdit size={16} />}
                <span className="ml-1">{label}</span>
            </Link>
        </div>
    );
};

export default EditButton;
