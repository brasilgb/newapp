'use client'
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        const encodeSearchQuery = encodeURI(searchQuery);
        router.push(`/clientes/search?q=${encodeSearchQuery}`);
    };

    return (
        <div className="w-full md:w-1/3">
            <form onSubmit={onSearch}>
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2"
                        placeholder="Buscar cliente"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                            type="submit"
                        >
                            <IoSearch className="text-xl text-gray-400" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchInput