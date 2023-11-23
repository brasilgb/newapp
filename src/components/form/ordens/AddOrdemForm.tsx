'use client'
import React, { useEffect, useState } from 'react'
import { BoxContent, BoxFooter } from "@/components/boxes";
import SaveButton from "@/components/buttons/SaveButton";
import { useController, useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ordensAddSchema } from "./addSchema";
import { useRouter } from "next/navigation";
import Select from 'react-select';

type FormData = z.infer<typeof ordensAddSchema>;

async function addOrdem(data: any) {
    const res = await fetch(`http://localhost:3000/api/ordens`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return res.json();
}

async function getNewOrdem() {
    const res = await fetch('http://localhost:3000/api/ordens', {
        method: 'GET',
        next: { revalidate: 0 },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

async function getAllClientes() {
    const res = await fetch('http://localhost:3000/api/clientes', {
        method: 'GET',
        next: { revalidate: 0 },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const AddOrdemForm = () => {
    const router = useRouter();
    const [allClientes, setAllClientes] = useState([]);
    const [newOrdem, setNewOrdem] = useState([]);

    const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
        defaultValues: {
            cliente_id: "",
            equipamento: "",
            modelo: "",
            senha: "",
            defeito: "",
            estado: "",
            acessorios: "",
            previsao: "",
            obs: "",
        },
        mode: 'onBlur',
        resolver: zodResolver(ordensAddSchema),
    });
    const { field: { value: nameValue, onChange: langOnChange, ...restLangField } } = useController({ name: 'cliente_id', control });

    const submitOrdem = async (data: any) => {

        const { status, message } = await addOrdem(data);

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

    useEffect(() => {
        const getClientes = async () => {
            const clientes = await getAllClientes();
            setAllClientes(clientes.map((cliente: any) => ({ value: cliente.id, label: cliente.nome })));
        };
        getClientes();
    }, [])

    useEffect(() => {
        const getOrdens = async () => {
            const ordens = await getNewOrdem();
            setNewOrdem(ordens.map((ordem: any) => (ordem.id)));
        };
        getOrdens();
    }, [])

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
                            defaultValue={parseInt(newOrdem[0]) + 1}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="nascimento">
                            Nome do cliente
                        </label>
                        <Select
                            className=""
                            styles={{
                                control: provided => ({
                                    ...provided,
                                    padding: 2,
                                    borderRadius: 6,
                                }),
                            }}
                            placeholder="Selecione o clientes"
                            isClearable
                            options={allClientes}
                            value={nameValue ? allClientes.find(x => x.value === nameValue) : nameValue}
                            onChange={option => langOnChange(option ? option.value : option)}
                            {...restLangField}
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
                            type="date"
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

export default AddOrdemForm