'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BoxContent, BoxFooter } from '@/components/boxes';
import SaveButton from '@/components/buttons/SaveButton';
import 'react-datepicker/dist/react-datepicker.css';
import { ClientesProps } from '@/types/clientes';
import { clientesSchema } from './schema';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import DeleteButton from '@/components/buttons/DeleteButton';
import InputMask from "react-input-mask";

type FormData = z.infer<typeof clientesSchema>;

async function editCliente(id: number, data: any) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return res.json();
}

async function addCliente(data: any) {
    const res = await fetch(`http://localhost:3000/api/clientes`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return res.json();
}

const ClienteForm = ({ cliente }: any) => {
    const router = useRouter();
    const cli: ClientesProps = cliente;
    const {
        handleSubmit,
        reset,
        register,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            cpf: cli ? cli?.cpf : "",
            nascimento: cli ? cli?.nascimento : "",
            nome: cli ? cli?.nome : "",
            email: cli ? cli?.email : "",
            cep: cli ? cli?.cep : "",
            uf: cli ? cli?.uf : "",
            cidade: cli ? cli?.cidade : "",
            bairro: cli ? cli?.bairro : "",
            endereco: cli ? cli?.endereco : "",
            complemento: cli ? cli?.complemento : "",
            telefone: cli ? cli?.telefone : "",
            contato: cli ? cli?.contato : "",
            telcontato: cli ? cli?.telcontato : "",
            obs: cli ? cli?.obs : "",
        },
        mode: 'onBlur',
        resolver: zodResolver(clientesSchema),
    });

    const submitCliente = async (data: any) => {
        const dataClientes = {
            cpf: data.cpf.toString().replace(/\.|-/gm, ''),
            nascimento: data.nascimento,
            nome: data.nome,
            email: data.email,
            cep: data.cep,
            uf: data.uf,
            cidade: data.cidade,
            bairro: data.bairro,
            endereco: data.endereco,
            complemento: data.complemento,
            telefone: data.telefone,
            contato: data.contato,
            telcontato: data.telcontato,
            obs: data.obs
        }

        if (cli?.length === 0) {
            const { status, message } = await addCliente(dataClientes);
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
                    router.push('/clientes');
                }, 2000);
            }
        } else {
            const { status, message } = await editCliente(cli?.id, dataClientes);
            if (!status) {
                toast(message, {
                    hideProgressBar: false,
                    autoClose: 2000,
                    type: 'error',
                    position: 'bottom-right',
                });
            } else {
                toast(message, {
                    hideProgressBar: false,
                    autoClose: 2000,
                    type: 'success',
                    position: 'bottom-right',
                });
            }
        }
    };

    const checkCEP = async (e: any) => {
        const cep = e.target.value.replace(/\D/g, '');
        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json()).then(data => {
                setValue('uf', data?.uf);
                setValue('cidade', data?.localidade);
                setValue('bairro', data?.bairro);
                setValue('endereco', data?.logradouro);
            })

    }

    return (
        <form className="px-3 w-full" onSubmit={handleSubmit(submitCliente)}>
            <BoxContent>
                <ToastContainer />
                <div className="grid grid-cols-6 gap-4">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="cpf">
                            CPF/CNPJ
                        </label>
                        <InputMask
                            className="input-form"
                            mask={"999.999.999-99"}
                            alwaysShowMask={false}
                            maskPlaceholder=''
                            type={'text'}
                            {...register("cpf")}
                        />
                        {errors.cpf?.message && (
                            <div className="text-sm text-red-600">
                                {errors.cpf?.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="nascimento">
                            Nascimento
                        </label>
                        <input
                            className="input-form"
                            type="date"
                            {...register('nascimento')}
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="nome">
                            Nome
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('nome')}
                        />
                        {errors.nome?.message && (
                            <div className="text-sm text-red-600">
                                {errors.nome?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="email">
                            E-mail
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('email')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-4 mt-6">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="cep">
                            CEP
                        </label>
                        <InputMask
                            className="input-form"
                            mask={"99999-999"}
                            alwaysShowMask={false}
                            maskPlaceholder=''
                            type={'text'}
                            {...register("cep")}
                            onBlur={checkCEP}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="uf">
                            UF
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('uf')}
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="cidade">
                            Cidade
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('cidade')}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="bairro">
                            Bairro
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('bairro')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="flex flex-col col-span-2">
                        <label className="label-form" htmlFor="endereco">
                            Endereço
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('endereco')}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="complemento">
                            Complemento
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('complemento')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="telefone">
                            Telefone
                        </label>
                        <InputMask
                            className="input-form"
                            mask={"(99) 99999 9999"}
                            alwaysShowMask={false}
                            maskPlaceholder=''
                            type={'text'}
                            {...register("telefone")}
                        />
                        {errors.telefone?.message && (
                            <div className="text-sm text-red-600">
                                {errors.telefone?.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col col-span-2">
                        <label className="label-form" htmlFor="contato">
                            Contato
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('contato')}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="telcontato">
                            Telefone de contato
                        </label>
                        <InputMask
                            className="input-form"
                            mask={"(99) 99999 9999"}
                            alwaysShowMask={false}
                            maskPlaceholder=''
                            type={'text'}
                            {...register("telcontato")}
                        />
                    </div>
                </div>

                <div className="mt-6">
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
                    {cli?.length === 0 ? '' : <DeleteButton label={'Deletar'} id={cli?.id} />}
                </div>
                <div>
                    <SaveButton />
                </div>
            </BoxFooter>
        </form>
    );
};

export default ClienteForm;
