import {BoxHeader, BoxMain} from '@/components/boxes';
import ClienteForm from '@/components/form/clientes/ClienteForm';
import React from 'react';

export function async() {}

async function getCliente(id: any) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const EditCliente = async ({params}: {params: {id: number}}) => {
    const {cliente} = await getCliente(params.id);

    return (
        <BoxMain>
            <BoxHeader>header</BoxHeader>
            <ClienteForm cliente={cliente} />
        </BoxMain>
    );
};
export default EditCliente;
