import { BoxHeader, BoxMain } from '@/components/boxes';
import BackButton from "@/components/buttons/BackButton";
import AddOrdemForm from "@/components/form/ordens/AddOrdemForm";
import EditOrdemForm from "@/components/form/ordens/EditOrdemForm";
import React from 'react';

export function async() { }

async function getOrdem(id: any) {
    const res = await fetch(`http://localhost:3000/api/ordens/${id}`, {
        method: 'GET',
        next: { revalidate: 0 },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const EditOrdem = async ({ params }: { params: { id: number } }) => {
    const { ordem } = await getOrdem(params.id);
    return (
        <BoxMain>
            <BoxHeader>
                <BackButton label={"Voltar"} path={"/ordens"} />
            </BoxHeader>
            <EditOrdemForm ordem={ordem} />
        </BoxMain>
    );
};
export default EditOrdem;
