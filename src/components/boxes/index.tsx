import React, { ReactNode } from 'react'
interface BoxesProps {
    children: ReactNode;
}
export const BoxMain = ({ children }: BoxesProps) => {
    return (
        <section className="flex flex-col items-start justify-between bg-white rounded shadow">
            {children}
        </section>
    )
}
