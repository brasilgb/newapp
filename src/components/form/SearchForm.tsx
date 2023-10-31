'use client';
import {useRouter} from 'next/navigation';
import {Router} from 'next/router';
import React, {useState} from 'react';
import {IoArrowForwardCircleOutline, IoSearch} from 'react-icons/io5';

interface SearchProps {
    data: any;
}

const SearchForm = ({data}: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();
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

    const setSearchParam = (id: number, nome: any) => {
        setSearchTerm(nome);
        setSearchResults([]);
        router.push(`/clientes/${id}`);
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
                    onClick={() => setSearchResults([])}
                    className={`fixed z-0 border-gray-50 rounded-md shadow bg-gray-900 bg-opacity-100 top-0 right-0 bottom-0 left-0 flex items-start justify-center md:px-40`}
                >
                    <div className="w-full pt-2 px-2 mt-36 flex flex-col items-start bg-gray-100 shadow rounded-md border-white">
                        {searchResults.map((cliente: any) => (
                            <div
                                key={cliente.id}
                                onClick={() =>
                                    setSearchParam(cliente.id, cliente.nome)
                                }
                                className="w-full"
                            >
                                <div className="cursor-pointer mb-2 text-sm text-gray-500 p-1 bg-white w-full flex rounded">
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
                                    <div className="text-blue-middle">
                                        <IoArrowForwardCircleOutline
                                            size={30}
                                        />
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
