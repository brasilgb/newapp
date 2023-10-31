import {z} from 'zod';

export const clientesSchema = z.object({
    cpf: z.string().min(1, 'O CPF/CNPJ é obrigatório'),
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
