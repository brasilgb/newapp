import React, { ReactNode } from 'react'
interface BoxesProps {
    children: ReactNode;
}

export const BoxMain = ({ children }: BoxesProps) => {
    return (
        <section className="flex flex-col items-start justify-between m-4 w-full bg-white rounded-md shadow">
            {children}
        </section>
    )
}

export const BoxHeader = ({ children }: BoxesProps) => {
    return (
        <div className="flex items-center justify-between w-full p-4">
            {children}
        </div>
    )
}

export const BoxContent = ({ children }: BoxesProps) => {
    return (
        <section className="w-full">
            {children}
        </section>
    )
}

export const BoxFooter = ({ children }: BoxesProps) => {
    return (
        <div className="flex items-center justify-between w-full p-4">
            {children}
        </div>
    )
}
