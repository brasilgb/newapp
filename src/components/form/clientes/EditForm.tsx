'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BoxContent, BoxFooter } from '@/components/boxes';
import SaveButton from '@/components/buttons/SaveButton';
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";

const schema = z.object({
  cpf: z.string().nonempty('O CPF/CNPJ é obrigatório'),
  nascimento: z.string(),
  nome: z.string().nonempty('O nome é obrigatório'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
});
type FormData = z.infer<typeof schema>;

const EditForm = ({ cliente }: any) => {
  const { cpf, nascimento, nome, email } = cliente;
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      cpf: cpf,
      nascimento: nascimento,
      nome: nome,
      email: email,
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const submitCliente = async (data: any) => {
    console.log(data);
  };

  return (
    <form className="px-3 w-full" onSubmit={handleSubmit(submitCliente)}>
      <BoxContent>
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

export default EditForm;
