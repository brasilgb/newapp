import {z} from 'zod';

export const ordensSchema = z.object({
    cliente_id: z.string(),
    equipamento: z.string().min(1, 'O equipamento é obrigatório'),
    modelo: z.string().min(1, 'O modelo é obrigatório'),
    senha: z.string(),
    defeito: z.string().min(1, 'O defeito é obrigatório'),
    estado: z.string(),
    acessorios: z.string(),
    orcamento: z.string(),
    desorcamneto: z.string(),
    detalhes: z.string().min(1, 'O telefone é obrigatório'),
    pecas: z.string(),
    valpecas: z.string(),
    valpacas: z.string(),
    valservico: z.string(),
    custo: z.string(),
    previsao: z.string().min(1, 'A previsão é obrigatório'),
    statusorcamento: z.string(),
    concluido: z.string(),
    comunicado: z.string(),
    entraga: z.string(),
    dtentrega: z.string(),
    tecnico: z.string().min(1, 'O técnico é obrigatório'),
    status: z.string(),
    envioemail: z.string(),
    obs: z.string(),
});

export type Ordens = z.infer<typeof ordensSchema>;
