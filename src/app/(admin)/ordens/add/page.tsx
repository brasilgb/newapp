import {BoxHeader, BoxMain} from '@/components/boxes';
import BackButton from "@/components/buttons/BackButton";
import AddOrdemForm from "@/components/form/ordens/AddOrdemForm";
import React from 'react';

const AddOrdem = async ({params}: {params: {id: number}}) => {
    return (
        <BoxMain>
            <BoxHeader>
                <BackButton label={"Voltar"} path={"/ordens"} />
            </BoxHeader>
            <AddOrdemForm />
        </BoxMain>
    );
};
export default AddOrdem;
