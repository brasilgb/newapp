'use client';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useState } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';

interface SearchProps {
    data: any;
}

const SearchForm = ({ data }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
        if (event.target.value !== '') {
            const results = data.filter((cliente: any) =>
                cliente.nome
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase()),
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="w-full md:w-1/3">
            <form
                className="relative flex items-center z-20"
                autoComplete="off"
            >
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IoSearch className="text-xl text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                        placeholder="Search"
                        required={true}
                    />
                </div>
            </form>
            {searchResults.length > 0 && (
                <div
                    className={`fixed z-0 border-gray-50 rounded-md shadow bg-gray-900 bg-opacity-100 top-0 right-0 bottom-0 left-0 flex items-start justify-center md:px-40`}
                >
                    <div
                        onClick={() => setSearchResults([])}
                        className='absolute z-40 top-24 right-[160px] w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 cursor-pointer'
                    >
                        <IoClose size={20} />
                    </div>
                    <div className="w-full relative z-10 max-h-96 overflow-auto pt-2 px-3 mt-36 flex flex-col items-start bg-gray-100 shadow-md rounded-md border-white">

                        {searchResults.map((cliente: any) => (
                            <div
                                key={cliente.id}
                                className="w-full"
                            >
                                <div className="mb-2 text-sm text-gray-500 p-2 bg-white border w-full flex rounded">
                                    <div className="flex-1 flex items-center justify-start">
                                        <div>
                                            <span className="font-semibold">
                                                Nome
                                            </span>
                                            : {cliente.nome}
                                        </div>
                                        <div>
                                            <span className="font-semibold ml-4">
                                                E-mail
                                            </span>
                                            : {cliente.email}
                                        </div>
                                        <div>
                                            <span className="font-semibold ml-4">
                                                CPF
                                            </span>
                                            : {cliente.cpf}
                                        </div>
                                        <div>
                                            <span className="font-semibold ml-4">
                                                Telefone
                                            </span>
                                            : {cliente.telefone}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <EditButton label={'Editar'} path={`/clientes/${cliente?.id}`} btnLink={true} name="cliente" />
                                        <DeleteButton label={'Deletar'} id={cliente.id} btnLink={true} name='cliente' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchForm;
