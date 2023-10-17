'use client'
import React from 'react'
import { MdAdd } from 'react-icons/md'

const SaveButton = () => {
    return (
        <button
            className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
        >
            <MdAdd size={16} />
            Salvar
        </button>
    )
}

export default SaveButton