'use client'
import { useSession } from "next-auth/react"
import Link from "next/link";
import React, { useState } from 'react'
import { IoPerson } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {}

const UserDropDown = (props: Props) => {
    const { data: session } = useSession()

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";
    return (
        // <div>{session?.user.name}</div>
        <>
            <div className="relative">
                <button
                    className="flex items-center justify-between p-2"
                    onClick={toggle}
                >
                    <div className="">
                        <IoPerson />
                    </div>
                    <div className="">
                        <MdOutlineKeyboardArrowDown size={24} />
                    </div>
                </button>
                <div className={`absolute top-11 right-0 z-30 w-[250px] min-h-[300px] flex flex-col py-4 bg-zinc-400 rounded ${transClass}`}>
                    {

                        <Link
                            className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
                            // href={session?.user.id || ''}
                            href="#"
                            onClick={toggle}
                        >
                            {session?.user.name}
                        </Link>

                    }
                </div>
            </div>
            {
                isOpen
                    ?
                    <div
                        className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/5"
                        onClick={toggle}
                    ></div>
                    :
                    <></>
            }
        </>
    )
}

export default UserDropDown