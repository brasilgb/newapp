'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoTrash, IoWarningOutline } from "react-icons/io5";
import { MdClose, MdDelete } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
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
    btnLink?: boolean;
    name: string;
}

const DeleteButton = ({ label, id, btnLink = false, name }: NewBtnProps) => {
    const [showConfirme, setShowConfirme] = useState(false);

    const router = useRouter();

    const handleDelete = async (idl: number) => {
        const { status, message } = await deleteCliente(idl);
        if (!status) {
            toast(message, {
                hideProgressBar: false,
                autoClose: 2000,
                type: 'error',
                position: 'bottom-right',
            });
        } else {
            toast(message, {
                hideProgressBar: false,
                autoClose: 2000,
                type: 'error',
                position: 'bottom-right',
            });
            setShowConfirme(false);
            router.refresh();
        }
    }
    return (
        <>

            {showConfirme &&
                <div className="fixed z-20 top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-500 bg-opacity-40">
                    <div className="w-1/4 bg-gray-50 p-3 border-2 border-white shadow-md rounded-md">
                        <div className="flex items-center justify-start">
                            <div className="w-20 flex justify-center text-red-400">
                                <IoWarningOutline size="40" />
                            </div>
                            <div>
                                <div className="flex items-center justify-start py-3">
                                    <h1 className="text-xl font-medium text-gray-700">Excluir data</h1>
                                </div>
                                <div>
                                    <p className="text-base">Têm certeza que deseja excluir este dado?</p>
                                    <p className="text-base">Essa ação não pode ser desfeita.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button
                                onClick={() => setShowConfirme(false)}
                                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 shadow rounded-md text-gray-600 flex items-center"
                                title="Cancelar"
                            >
                                <MdClose size={16} />
                                <span className="font-medium">Cancelar</span>
                            </button>
                            <button
                                onClick={() => handleDelete(id)}
                                title="Excluir"
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 shadow rounded-md text-white flex items-center"
                            >
                                <IoTrash size={16} />
                                <span className="ml-0.5 font-medium">Excluir</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div>
                <div>
                    <button
                        className={`
                        ${btnLink
                                ? 'text-gray-500 underline'
                                : 'flex items-center justify-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200 font-medium rounded text-sm px-4 py-2 focus:outline-none'
                            }
                        `}
                        onClick={() => setShowConfirme(true)}
                        title={`Excluir ${name}`}
                    >
                        {!btnLink && <MdDelete size={16} />}
                        <span className="ml-1">{label}</span>
                    </button>
                </div>
                <ToastContainer />
            </div>
        </>

    );
};

export default DeleteButton;
