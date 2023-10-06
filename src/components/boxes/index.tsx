import React, { ReactNode } from 'react'
interface BoxesProps {
    children: ReactNode;
}
export const BoxMain = ({ children }: BoxesProps) => {
    return (
        <section className="bg-white shadow-md">
            {children}
        </section>
    )
}
