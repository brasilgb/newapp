import { string } from "zod"

export interface OrdensProps {
    id: number;
    cliente_id: string;
    equipamento: string;
    modelo: string;
    senha: string;
    defeito: string;
    estado: string;
    acessorios: string;
    orcamento: number;
    descorcamento: string;
    detalhes: string;
    pecas: string;
    valpecas: string;
    valservico: string;
    custo: string;
    previsao: string;
    statusorcamento: string;
    concluido: string;
    comunicado: string;
    entrega: string;
    dtentrega: string;
    tecnico: string;
    status: number;
    envioemail: string;
    obs: string;
    imagens: string[];
    clientes:string[{
        nome: string;
        telefone: string;
    }];
    createdAt: Date;
    updatedAt: Date;
}
