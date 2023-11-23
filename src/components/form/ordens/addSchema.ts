import {z} from 'zod';

export const ordensAddSchema = z.object({
    cliente_id: z.string().min(1, 'Selecione o cliente'),
    equipamento: z.string().min(1, 'O tipo do equipamento é obrigatório'),
    modelo: z.string(),
    senha: z.string(),
    defeito: z.string().min(1, 'O defeito é obrigatório'),
    estado: z.string(),
    acessorios: z.string(),
    previsao: z.string(),
    obs: z.string(),
});

export type Ordens = z.infer<typeof ordensAddSchema>;