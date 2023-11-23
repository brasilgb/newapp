import PaginationControls from '@/components/PaginationControls';
import { BoxContent, BoxFooter, BoxHeader, BoxMain } from '@/components/boxes';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';
import NewButton from '@/components/buttons/NewButton';
import OrderClient from "@/components/buttons/OrderClient";
import SearchInput from "@/components/form/SearchInput";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/table';
import { OrdensProps } from "@/types/ordens";
import moment from 'moment';
import React from 'react';

async function getOrdens() {
    const res = await fetch('http://localhost:3000/api/ordens', {
        method: 'GET',
        next: { revalidate: 0 },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}


const Ordens = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const ordens = await getOrdens();

    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';

    // mocked, skipped and limited in the real app
    const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
    const end = start + Number(per_page); // 5, 10, 15 ...

    const res = ordens.slice(start, end);
    return (
        <BoxMain>
            <BoxHeader>
                {/* <SearchForm data={ordens} /> */}
                <SearchInput placeHolder="Buscar ordem" />
                <NewButton label={'Nova ordem'} path={'/ordens/add'} />
            </BoxHeader>
            <BoxContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">N° Ordem</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Recebimento</TableHead>
                            <TableHead>Equipamento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Entrega</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {res.map((ordem: OrdensProps) => (
                            <TableRow key={ordem.id}>
                                <TableCell className="pl-4 text-gray-700 font-medium">
                                    {ordem?.id}
                                </TableCell>
                                <TableCell>{ordem?.clientes?.nome}</TableCell>
                                <TableCell>{ordem?.clientes?.telefone}</TableCell>
                                <TableCell className="pr-4">
                                    {moment(ordem?.createdAt).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>{ordem?.equipamento}</TableCell>
                                <TableCell>{ordem?.status}</TableCell>
                                <TableCell className="pr-4">
                                    {
                                        ordem?.status !== '1'
                                            ? ''
                                            : moment(ordem?.updatedAt).format('DD/MM/YYYY')
                                    }
                                </TableCell>
                                <TableCell className="flex items-center justify-end pr-3 gap-2">
                                    <EditButton
                                        label={'Editar'}
                                        path={`/ordens/${ordem?.id}`}
                                        name='ordem'
                                    />
                                    <DeleteButton
                                        label={'Excluir'}
                                        id={ordem?.id}
                                        name='ordem'
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </BoxContent>
            <BoxFooter>
                <PaginationControls
                    hasNextPage={end < ordens.length}
                    hasPrevPage={start > 0}
                    hasLength={ordens.length}
                    url="ordens"
                />
            </BoxFooter>
        </BoxMain>
    );
};

export default Ordens;
