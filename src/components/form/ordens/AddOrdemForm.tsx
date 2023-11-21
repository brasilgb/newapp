'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import 'react-datepicker/dist/react-datepicker.css';
import { OrdensProps } from '@/types/ordens';
import { ordensSchema } from './schema';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { BoxContent, BoxFooter } from "@/components/boxes";
import SaveButton from "@/components/buttons/SaveButton";

type FormData = z.infer<typeof ordensSchema>;

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

const OrdemForm = ({ cliente }: any) => {
    const router = useRouter();

    const cli: OrdensProps = cliente;
    const {
        handleSubmit,
        reset,
        register,
        setValue,
        control,
        watch,
        formState: { errors },
    } = useForm<FormData>({
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
        resolver: zodResolver(ordensSchema),
    });

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

    // const checkCEP = async (e: any) => {
    //     const cep = e.target.value.replace(/\D/g, '');
    //     await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    //         .then(res => res.json()).then(data => {
    //             setValue('uf', data?.uf);
    //             setValue('cidade', data?.localidade);
    //             setValue('bairro', data?.bairro);
    //             setValue('endereco', data?.logradouro);
    //         })

    // }

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
                            {...register('cliente_id')}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="nome">
                            Equipamento
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
                <div className="md:grid md:grid-cols-7 md:gap-x-6">
                    <div className="col-span-3 flex flex-col">
                        <label className="label-form" htmlFor="email">
                            Modelo
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('modelo')}
                        />
                        {errors.modelo?.message && (
                            <div className="text-sm text-red-600">
                                {errors.modelo?.message}
                            </div>
                        )}
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
                <div className="md:grid md:grid-cols-2 md:gap-x-6">
                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="cidade">
                            Defeito relatado
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('defeito')}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="label-form" htmlFor="bairro">
                            Estado do equipamento
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            {...register('estado')}
                        />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-x-6">
                    <div className="flex flex-col">
                        <label className="label-form" htmlFor="endereco">
                            Acessórios
                        </label>
                        <input
                            className="input-form"
                            type="text"
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

                </div>
                <div>
                    <SaveButton />
                </div>
            </BoxFooter>
        </form>
    );
};
export default OrdemForm;
