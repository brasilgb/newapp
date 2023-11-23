import {z} from 'zod';

export const ordensEditSchema = z.object({
    cliente_id: z.string().min(1, 'Selecione o cliente'),
    equipamento: z.string().min(1, 'O tipo do equipamento é obrigatório'),
    modelo: z.string(),
    senha: z.string(),
    defeito: z.string().min(1, 'O defeito é obrigatório'),
    estado: z.string(),
    acessorios: z.string(),
    orcamento: z.string(),
    desorcamneto: z.string(),
    detalhes: z.string(),
    pecas: z.string(),
    valpecas: z.string(),
    valpacas: z.string(),
    valservico: z.string(),
    custo: z.string(),
    previsao: z.string(),
    statusorcamento: z.string(),
    concluido: z.string(),
    comunicado: z.string(),
    entraga: z.string(),
    dtentrega: z.string(),
    tecnico: z.string().min(1, 'Selecione o técnico'),
    status: z.string().min(1, 'Selecione o status'),
    envioemail: z.string(),
    obs: z.string(),
});

export type Ordens = z.infer<typeof ordensEditSchema>;
