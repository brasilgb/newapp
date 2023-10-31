'use client';
import React from 'react';
import {IoSave} from 'react-icons/io5';

const SaveButton = () => {
    return (
        <button
            className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
        >
            <IoSave size={16} />
            <span className="ml-1">Salvar</span>
        </button>
    );
};

export default SaveButton;
