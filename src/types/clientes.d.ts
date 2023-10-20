export interface ClientesProps {
    id: number;
    cpf: string;
    nascimento: string;
    nome: string;
    email: string;
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    endereco: string;
    complemento: string;
    telefone: string;
    contato: string;
    telcontato: string;
    obs: string;
    createdAt: Date;
    updatedAt: Date;
    agendas: string;
    ordens: string[];
}
