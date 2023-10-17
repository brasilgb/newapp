'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BoxContent, BoxFooter } from "@/components/boxes";
import SaveButton from "@/components/buttons/SaveButton";

const schema = z.object({
  nome: z.string(),
  email: z.string(),
})
type FormData = z.infer<typeof schema>;

interface FormClienteProps {

}

const EditForm = ({ data }: any) => {
  const { handleSubmit, reset, register, formState: { errors } } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(schema)
  })

  const submitCliente = async (data: any) => {
    console.log(data);
  }
  return (
    <>
      <BoxContent>
        <form className="px-3" onSubmit={handleSubmit(submitCliente)}>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label
                className="label-form"
                htmlFor="nome"
              >
                Nome
              </label>
              <input
                className="input-form"
                type="text"
                {...register('nome')}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="label-form"
                htmlFor="nome"
              >
                Nome
              </label>
              <input
                className="input-form"
                type="text"
                {...register('nome')}
              />
            </div>
          </div>

          <div><SaveButton /></div>
        </form>
      </BoxContent>
    </>
  )
}

export default EditForm