import { string } from "zod"

export interface OrdensProps {
    id: string;
    cliente_id: string;
    equipamento: string;
    modelo: string;
    senha: string;
    defeito: string;
    estado: string;
    acessorios: string;
    orcamento: string;
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
    status: string;
    envioemail: string;
    observacoes: string;
    imagens: string[];
}
