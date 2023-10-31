import { BoxHeader, BoxMain } from '@/components/boxes';
import BackButton from "@/components/buttons/BackButton";
import ClienteForm from '@/components/form/clientes/ClienteForm';
import React from 'react';

export function async() { }

async function getCliente(id: any) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const EditCliente = async ({ params }: { params: { id: number } }) => {
    const { cliente } = await getCliente(params.id);

    return (
        <BoxMain>
            <BoxHeader>
                <BackButton label={"Voltar"} path={"/clientes"} />
            </BoxHeader>
            <ClienteForm cliente={cliente} />
        </BoxMain>
    );
};
export default EditCliente;
