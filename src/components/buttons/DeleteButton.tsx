'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import {MdDelete} from 'react-icons/md';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function deleteCliente(id: number) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

interface NewBtnProps {
    label: string;
    id: number;
}

const DeleteButton = ({label, id}: NewBtnProps) => {
    const router = useRouter();

    const handleDelete = async (idl: number) => {
        const { status, message} = await deleteCliente(idl);
            if (!status) {
                toast(message, {
                    hideProgressBar: false,
                    autoClose: 2000,
                    type: 'success',
                    position: 'bottom-right',
                });
            } else {
                toast(message, {
                    hideProgressBar: false,
                    autoClose: 2000,
                    type: 'error',
                    position: 'bottom-right',
                });
                    router.refresh();
            }
    }
    return (
        <div>
            <ToastContainer />
            <div className=''>
                            <button
                className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200 font-medium rounded text-sm px-4 py-2 focus:outline-none"
                onClick={() => handleDelete(id)}
            >
                <MdDelete size={16} />
                <span className="ml-1">{label}</span>
            </button>
            </div>

        </div>
    );
};

export default DeleteButton;
