
import { BoxContent, BoxFooter, BoxHeader, BoxMain } from "@/components/boxes"
import EditForm from "@/components/form/clientes/EditForm"
import React from 'react'

export function async() {

}

async function getClientes(id: any) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}


interface ClienteProps {
    params: { id: number }
}
const EditCliente = async ({ params }: ClienteProps) => {

    const clientes = await getClientes(params.id);

    return (
        <BoxMain>
            <BoxHeader>
                header
            </BoxHeader>
            <EditForm data={clientes} />
        </BoxMain>
    )
}
export default EditCliente