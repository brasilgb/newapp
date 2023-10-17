
import React from 'react'

export function async () {
    
}
interface ClienteProps {
    params: { id: number }
}

async function getClientes({ params }: ClienteProps) {
    const res = await fetch(`http://localhost:3000/api/clientes/${params.id}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

const EditCliente = () => {

const clientes = getClientes();
console.log(JSON.stringify(clientes))
    return (
        <div>
        
        </div>
    )
}
export default EditCliente