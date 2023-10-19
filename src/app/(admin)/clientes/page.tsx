import PaginationControls from '@/components/PaginationControls';
import { BoxContent, BoxFooter, BoxHeader, BoxMain } from '@/components/boxes';
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

async function getClientes(page: any, limit: any) {
    const res = await fetch(`http://localhost:3000/api/clientes?page=${page}&limit=${limit}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

interface ClientesProps {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    createdAt: string;
}

const Clientes = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {

    const page = searchParams['page'] ?? '2';
    const limit = searchParams['per_page'] ?? '5';

    const result = await getClientes(page, limit);

    return (
        <BoxMain>
            <BoxHeader>
                <SearchForm />
                <NewButton label={'Novo'} path={'/'} />
            </BoxHeader>
            <BoxContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Cadastro</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.clientes.map((cliente: ClientesProps) => (
                            <TableRow>
                                <TableCell className="pl-4 text-gray-700 font-medium">
                                    {cliente.nome}
                                </TableCell>
                                <TableCell>{cliente.email}</TableCell>
                                <TableCell>{cliente.telefone}</TableCell>
                                <TableCell className="pr-4">
                                    {moment(cliente.createdAt).format(
                                        'DD/MM/YYYY',
                                    )}
                                </TableCell>
                                <TableCell className="flex items-center justify-end pr-3 gap-2">
                                    <EditButton
                                        label={''}
                                        path={`/clientes/${cliente.id}`}
                                    />
                                    <DeleteButton label={''} path={''} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </BoxContent>
            <BoxFooter>
                <PaginationControls
                    hasNextPage={result.clientes.length}
                    hasPrevPage={0}
                    hasLength={result.clientes.length}
                    page={page}
                    limit={limit}
                />
            </BoxFooter>
        </BoxMain>
    );
};

export default Clientes;
