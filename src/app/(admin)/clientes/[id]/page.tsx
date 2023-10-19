import {BoxHeader, BoxMain} from '@/components/boxes';
import EditForm from '@/components/form/clientes/EditForm';
import React from 'react';

export function async() {}

async function getCliente(id: any) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

interface ClienteProps {
    params: {id: number};
}
const EditCliente = async ({params}: ClienteProps) => {
    
    const data = await getCliente(params.id);

    return (
        <BoxMain>
            <BoxHeader>header</BoxHeader>
            <EditForm cliente={data.data.cliente} />
        </BoxMain>
    );
};
export default EditCliente;
