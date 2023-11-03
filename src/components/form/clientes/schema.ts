import {z} from 'zod';
import {cnpj, cpf} from 'cpf-cnpj-validator';

const validateCpfCnpj = async (num: any) => {
    const numcpf = (num.toString().replace(/\.|-/gm,''))
    if (numcpf.length < 12) {
        return await cpf.isValid(numcpf);
    }
    if (numcpf.length > 11) {
        return await cnpj.isValid(numcpf);
    }
};

export const clientesSchema = z.object({
    cpf: z.string().min(1, 'O CPF/CNPJ é obrigatório')
    .refine(async value => (await validateCpfCnpj(value)) === true, {
        message: `CPF ou CNPJ inválido!`
    }),
    nascimento: z.string(),
    nome: z.string().min(1, 'O nome é obrigatório'),
    email: z.string(),
    cep: z.string(),
    uf: z.string(),
    cidade: z.string(),
    bairro: z.string(),
    endereco: z.string(),
    complemento: z.string(),
    telefone: z.string().min(1, 'O telefone é obrigatório'),
    contato: z.string(),
    telcontato: z.string(),
    obs: z.string(),
});

export type Clientes = z.infer<typeof clientesSchema>;
