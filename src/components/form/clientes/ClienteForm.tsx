'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BoxContent, BoxFooter } from '@/components/boxes';
import SaveButton from '@/components/buttons/SaveButton';
import 'react-datepicker/dist/react-datepicker.css';
import { ClientesProps } from '@/types/clientes';
import { clientesSchema } from "./schema";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { redirect, useRouter } from "next/navigation";

type FormData = z.infer<typeof clientesSchema>;

async function editCliente(id: number, data: any) {
  const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });
  return res.json();
}

async function addCliente(data: any) {
  const res = await fetch(`http://localhost:3000/api/clientes`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });
  return res.json();
}


const ClienteForm = ({ cliente }: any) => {
  const router = useRouter()
  const cli: ClientesProps = cliente;
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      cpf: cli.cpf,
      nascimento: cli.nascimento,
      nome: cli.nome,
      email: cli.email,
      cep: cli.cep,
      uf: cli.uf,
      cidade: cli.cidade,
      bairro: cli.bairro,
      endereco: cli.endereco,
      complemento: cli.complemento,
      telefone: cli.telefone,
      contato: cli.contato,
      telcontato: cli.telcontato,
      obs: cli.obs,
    },
    mode: 'onBlur',
    resolver: zodResolver(clientesSchema),
  });

  const submitCliente = async (data: any) => {
    if (cli.length === 0) {
      const { status, message } = await addCliente(data);
      if (!status) {
        toast(message, { hideProgressBar: false, autoClose: 2000, type: 'error', position: 'bottom-right' });
      } else {
        toast(message, { hideProgressBar: false, autoClose: 2000, type: 'success', position: 'bottom-right' });
        setTimeout(() => {
          router.push('/clientes')
        }, 2000)
      }
    } else {
      const { status, message } = await editCliente(cli.id, data);
      if (!status) {
        toast(message, { hideProgressBar: false, autoClose: 2000, type: 'error', position: 'bottom-right' });
      } else {
        toast(message, { hideProgressBar: false, autoClose: 2000, type: 'success', position: 'bottom-right' });
      }
    }
  };

  return (
    <form className="px-3 w-full" onSubmit={handleSubmit(submitCliente)}>

      <BoxContent>
        <ToastContainer />
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col">
            <label className="label-form" htmlFor="cpf">
              CPF/CNPJ
            </label>
            <input
              className="input-form"
              type="text"
              {...register('cpf')}
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
            {/* <DatePicker selected={date} onChange={(date:any) => setDate(date)} /> */}
            <input
              className="input-form"
              type="date"
              // value={'2023-10-05'}
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
            {errors.email?.message && (
              <div className="text-sm text-red-600">
                {errors.email?.message}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-6">
          <div className="flex flex-col">
            <label className="label-form" htmlFor="cep">
              CEP
            </label>
            <input
              className="input-form"
              type="text"
              {...register('cep')}
            />
            {errors.cep?.message && (
              <div className="text-sm text-red-600">
                {errors.cep?.message}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="label-form" htmlFor="uf">
              UF
            </label>
            <input
              className="input-form"
              type="text"
              // value={'2023-10-05'}
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
            {errors.cidade?.message && (
              <div className="text-sm text-red-600">
                {errors.cidade?.message}
              </div>
            )}
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
            {errors.bairro?.message && (
              <div className="text-sm text-red-600">
                {errors.bairro?.message}
              </div>
            )}
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
            {errors.endereco?.message && (
              <div className="text-sm text-red-600">
                {errors.endereco?.message}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="label-form" htmlFor="complemento">
              Complemento
            </label>
            <input
              className="input-form"
              type="text"
              // value={'2023-10-05'}
              {...register('complemento')}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="flex flex-col">
            <label className="label-form" htmlFor="telefone">
              Telefone
            </label>
            <input
              className="input-form"
              type="text"
              {...register('telefone')}
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
            <input
              className="input-form"
              type="text"
              // value={'2023-10-05'}
              {...register('telcontato')}
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
              // value={'2023-10-05'}
              {...register('obs')}
            />
          </div>
        </div>
      </BoxContent>
      <BoxFooter>
        <div></div>
        <div>
          <SaveButton />
        </div>
      </BoxFooter>
    </form>
  );
};

export default ClienteForm;
