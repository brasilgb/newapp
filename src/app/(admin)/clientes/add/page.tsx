import {BoxHeader, BoxMain} from '@/components/boxes';
import BackButton from "@/components/buttons/BackButton";
import ClienteForm from '@/components/form/clientes/ClienteForm';
import React from 'react';

const AddCliente = async ({params}: {params: {id: number}}) => {
    return (
        <BoxMain>
            <BoxHeader>
                <BackButton label={"Voltar"} path={"/clientes"} />
            </BoxHeader>
            <ClienteForm cliente={[]} />
        </BoxMain>
    );
};
export default AddCliente;
