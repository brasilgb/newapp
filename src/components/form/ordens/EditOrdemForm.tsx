'use client'
import React from 'react'
import { BoxContent, BoxFooter } from "@/components/boxes";
import SaveButton from "@/components/buttons/SaveButton";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ordensEditSchema } from "./editSchema";
import { useRouter } from "next/navigation";
import { OrdensProps } from "@/types/ordens";
import moment from "moment";
type FormData = z.infer<typeof ordensEditSchema>;

async function editOrdem(id: number, data: any) {
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

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            cliente_id: ord?.cliente_id,
            equipamento: ord?.equipamento,
            modelo: ord?.modelo,
            senha: ord?.senha,
            defeito: ord?.defeito,
            estado: ord?.estado,
            acessorios: ord?.acessorios,
            previsao: ord?.previsao,
            orcamento: ord?.orcamento,
            descorcamento: ord?.descorcamento,
            pecas: ord?.pecas,
            valpecas: ord?.valpecas,
            valservico: ord?.valservico,
            custo: ord?.custo,
            status: ord?.status,
            tecnico: ord?.tecnico,
            envioemail: ord?.envioemail,
            detalhes: ord?.detalhes,
            obs: ord?.obs,
        },
        mode: 'onBlur',
        resolver: zodResolver(ordensEditSchema),
    });
    const submitOrdem = async (data: any) => {
        setValue('cliente_id', ord.cliente_id)
        const { status, message } = await editOrdem(ord?.id, data);

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
                        <label className="label-form" htmlFor="ordem">
                            N° Ordem
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            disabled
                            defaultValue={ord.id}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="nome">
                            Nome do cliente
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            disabled
                            defaultValue={ord.clientes.nome}
                        />
                    </div>
                    <input type="hidden" {...register('cliente_id')} />

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="equipamento">
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
                        <label className="label-form" htmlFor="modelo">
                            Modelo do equipamento
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('modelo')}
                        />

                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="senha">
                            Senha do equipamento
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('senha')}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="previsao">
                            Previsão de entrega
                        </label>
                        <input
                            className="input-form"
                            type="date"
                            {...register('previsao')}
                        />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-3 md:gap-x-6 mt-6 pt-4">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="defeito">
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
                        <label className="label-form" htmlFor="estado">
                            Estado do equipamento
                        </label>
                        <textarea
                            className="input-form"
                            {...register('estado')}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="acessorios">
                            Acessórios
                        </label>
                        <textarea
                            className="input-form"
                            {...register('acessorios')}
                        />
                    </div>
                </div>

                <div className="mt-6 w-full border-b pb-6">
                    <div className="border-b text-lg font-medium text-gray-500 bg-gray-100 px-2">Orçamento</div>
                    <div className="md:grid md:grid-cols-3 md:gap-x-6 mt-6">
                        <div className="flex flex-col">
                            <label className="label-form" htmlFor="orcamento">
                                Status do orçamento
                            </label>
                            <select
                                className="input-form"
                                {...register('orcamento')}
                            >
                                <option value="">Selecione o status</option>
                                <option value="1">Gerado</option>
                                <option value="2">Aprovado</option>
                            </select>
                        </div>

                        <div className="flex flex-col col-span-2">
                            <label className="label-form" htmlFor="descorcamento">
                                Descrição do orçamento
                            </label>
                            <textarea
                                className="input-form"
                                {...register('descorcamento')}
                            />
                        </div>
                    </div>

                </div>

                <div className="md:grid md:grid-cols-5 md:gap-x-6 mt-6">
                    <div className="flex flex-col col-span-2">
                        <label className="label-form" htmlFor="pecas">
                            Peças adicionadas
                        </label>
                        <input
                            className="input-form"
                            {...register('pecas')}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="valpecas">
                            Valor das peças
                        </label>
                        <input
                            className="input-form"
                            {...register('valpecas')}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="valservico">
                            Valor do serviço
                        </label>
                        <input
                            className="input-form"
                            {...register('valservico')}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="custo">
                            Custo total
                        </label>
                        <input
                            className="input-form"
                            {...register('custo')}
                        />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-x-6 mt-6">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="tecnico">
                            Técnico
                        </label>
                        <select
                            className="input-form"
                            {...register('tecnico')}
                        >
                            <option value="">Selecione o técnico</option>
                            <option value="1">Gerado</option>
                            <option value="2">Aprovado</option>
                        </select>
                        {errors.tecnico?.message && (
                            <div className="text-sm text-red-600">
                                {errors.tecnico?.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="status">
                            Status do serviço
                        </label>
                        <select
                            className="input-form"
                            {...register('status')}
                        >
                            <option value="">Selecione o status</option>
                            <option value="1">Ordem aberta</option>
                            <option value="2">Aguardando avaliação</option>
                            <option value="3">Ordem fechada</option>
                            <option value="4">Executando reparo</option>
                            <option value="5">(CA)Serviço concluído</option>
                            <option value="6">(CN)Serviço concluído</option>
                            <option value="7">Entregue ao cliente</option>
                        </select>
                        {errors.status?.message && (
                            <div className="text-sm text-red-600">
                                {errors.status?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-x-6 mt-6">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="detalhes">
                            Detalhes do serviço
                        </label>
                        <textarea
                            className="input-form"
                            {...register('detalhes')}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="obs">
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