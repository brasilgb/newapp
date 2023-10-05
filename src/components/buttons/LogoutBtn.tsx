'use client'
import { signOut } from "next-auth/react"
import React from 'react'

type Props = {}

const LogoutBtn = (props: Props) => {
    return (
        <button 
        onClick={() => signOut() }
        className=".btn-login"
        >
            Sair
        </button>
    )
}

export default LogoutBtn