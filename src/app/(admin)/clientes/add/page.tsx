import { BoxHeader, BoxMain } from '@/components/boxes';
import ClienteForm from '@/components/form/clientes/ClienteForm'
import React from 'react';

const AddCliente = async ({ params }: { params: { id: number } }) => {

    return (
        <BoxMain>
            <BoxHeader>header</BoxHeader>
            <ClienteForm cliente={[]} />
        </BoxMain>
    );
};
export default AddCliente;
