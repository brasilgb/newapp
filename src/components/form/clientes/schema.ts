import {z} from 'zod';

export const clientesSchema = z.object({
    cpf: z.string().nonempty('O CPF/CNPJ é obrigatório'),
    nascimento: z.string(),
    nome: z.string().nonempty('O nome é obrigatório'),
    email: z.string(),
    cep: z.string(),
    uf: z.string(),
    cidade: z.string(),
    bairro: z.string(),
    endereco: z.string(),
    complemento: z.string(),
    telefone: z.string(),
    contato: z.string(),
    telcontato: z.string(),
    obs: z.string(),
});

export type Clientes = z.infer<typeof clientesSchema>;
