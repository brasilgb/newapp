'use client'
import React from 'react'
import { BoxContent, BoxFooter } from "@/components/boxes";
import SaveButton from "@/components/buttons/SaveButton";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ordensAddSchema } from "./addSchema";
import { useRouter } from "next/navigation";
import { OrdensProps } from "@/types/ordens";
import moment from "moment";
type FormData = z.infer<typeof ordensAddSchema>;

async function editOrdem(id:number, data: any) {
    const res = await fetch(`http://localhost:3000/api/ordens/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return res.json();
}

const EditOrdemForm = ({ ordem }: any) => {
    const router = useRouter();
    const ord: OrdensProps = ordem;

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            cliente_id: ord.cliente_id,
            equipamento: ord.equipamento,
            modelo: ord.modelo,
            senha: ord.senha,
            defeito: ord.defeito,
            estado: ord.estado,
            acessorios: ord.acessorios,
            previsao: ord.previsao,
            orcamento: ord.orcamento,
            descorcamento: ord.descorcamento,
            pecas: ord.pecas,
            valpecas: ord.valpecas,
            valservico: ord.valservico,
            custo: ord.custo,
            status: ord.status,
            tecnico: ord.tecnico,
            envioemail: ord.envioemail,
            detalhes: ord.detalhes,
            dtentrega: ord.status === 7 ? moment() : ord.createdAt,
            obs: ord.obs,
        },
        mode: 'onBlur',
        resolver: zodResolver(ordensAddSchema),
    });
    const submitOrdem = async (data: any) => {

        const { status, message } = await editOrdem(ord.id, data);

        if (!status) {
            toast(message, {
                hideProgressBar: false,
                autoClose: 2000,
                type: 'error',
                position: 'bottom-right',
            });
        } else {
            toast(message, {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
                position: 'bottom-right',
            });
            setTimeout(() => {
                router.push('/ordens');
            }, 2000);
        }
    }
    return (
        <form className="px-3 w-full" onSubmit={handleSubmit(submitOrdem)}>
            <BoxContent>
                <ToastContainer />
                <div className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="cpf">
                            N° Ordem
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            disabled
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="nascimento">
                            Nome do cliente
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            value={ord.clientes.nome}
                            {...register('cliente_id')}
                        />
                        {errors.cliente_id?.message && (
                            <div className="text-sm text-red-600">
                                {errors.cliente_id?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="nome">
                            Tipo do equipamento
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('equipamento')}
                        />
                        {errors.equipamento?.message && (
                            <div className="text-sm text-red-600">
                                {errors.equipamento?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:grid md:grid-cols-7 md:gap-x-6 mt-6">
                    <div className="col-span-3 flex flex-col">
                        <label className="label-form" htmlFor="email">
                            Modelo do equipamento
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('modelo')}
                        />

                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="cep">
                            Senha do equipamento
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('senha')}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="uf">
                            Previsão de entrega
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('previsao')}
                        />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-x-6 mt-6">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="cidade">
                            Defeito relatado/Serviço solicitado
                        </label>
                        <textarea
                            className="input-form"
                            {...register('defeito')}
                        />
                        {errors.defeito?.message && (
                            <div className="text-sm text-red-600">
                                {errors.defeito?.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="bairro">
                            Estado do equipamento
                        </label>
                        <textarea
                            className="input-form"
                            {...register('estado')}
                        />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-x-6 mt-6">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="endereco">
                            Acessórios
                        </label>
                        <textarea
                            className="input-form"
                            {...register('acessorios')}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="complemento">
                            Observações
                        </label>
                        <textarea
                            className="input-form"
                            {...register('obs')}
                        />
                    </div>
                </div>
            </BoxContent>
            <BoxFooter>
                <div>
                </div>
                <div>
                    <SaveButton />
                </div>
            </BoxFooter>
        </form>
    )
}

export default EditOrdemForm