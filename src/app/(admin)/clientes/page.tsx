import PaginationControls from '@/components/PaginationControls';
import {BoxContent, BoxFooter, BoxHeader, BoxMain} from '@/components/boxes';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';
import NewButton from '@/components/buttons/NewButton';
import SearchForm from '@/components/form/SearchForm';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/table';
import moment from 'moment';
import React from 'react';

async function getClientes() {
    const res = await fetch('http://localhost:3000/api/clientes', {
        method: 'GET',
        next: {revalidate: 0},
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

interface ClientesProps {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    createdAt: string;
}

const Clientes = async ({
    searchParams,
}: {
    searchParams: {[key: string]: string | string[] | undefined};
}) => {
    const clientes = await getClientes();

    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';

    // mocked, skipped and limited in the real app
    const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
    const end = start + Number(per_page); // 5, 10, 15 ...

    const res = clientes.slice(start, end);
    return (
        <BoxMain>
            <BoxHeader>
                <SearchForm data={clientes} />
                <NewButton label={'Novo cliente'} path={'/clientes/add'} />
            </BoxHeader>
            <BoxContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Cadastro</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {res.map((cliente: ClientesProps) => (
                            <TableRow>
                                <TableCell className="pl-4 text-gray-700 font-medium">
                                    {cliente.nome}
                                </TableCell>
                                <TableCell>{cliente.email}</TableCell>
                                <TableCell>{cliente.cpf}</TableCell>
                                <TableCell>{cliente.telefone}</TableCell>
                                <TableCell className="pr-4">
                                    {moment(cliente.createdAt).format(
                                        'DD/MM/YYYY',
                                    )}
                                </TableCell>
                                <TableCell className="flex items-center justify-end pr-3 gap-2">
                                    <EditButton
                                        label={'Editar'}
                                        path={`/clientes/${cliente.id}`}
                                    />
                                    <DeleteButton label={'Excluir'} path={''} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </BoxContent>
            <BoxFooter>
                <PaginationControls
                    hasNextPage={end < clientes.length}
                    hasPrevPage={start > 0}
                    hasLength={clientes.length}
                />
            </BoxFooter>
        </BoxMain>
    );
};

export default Clientes;
