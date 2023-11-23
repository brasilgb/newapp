'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import { BoxContent, BoxHeader, BoxMain } from "@/components/boxes";
import SearchInput from "@/components/form/SearchInput";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import moment from "moment";
import EditButton from "@/components/buttons/EditButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import BackButton from "@/components/buttons/BackButton";
import OrderClient from "@/components/buttons/OrderClient";

const fetchClientes = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Falha ao requisitar clientes")
  }

  return response.json();
}
const SearchPage = () => {
  const search = useSearchParams();
  const [clientes, setClientes] = useState([]);
  const [messages, setMessages] = useState([]);

  const searchQuery = search ? search.get("q") : null;
  const encodeSearchQuery = encodeURI(searchQuery || "");
  useEffect(() => {
    const getClientes = async () => {
      const { cliente, message } = await fetchClientes(`/api/clientes/search?q=${encodeSearchQuery}`)
      setClientes(cliente);
      setMessages(message);
    }
    getClientes();
  }, [])


  return (
    <BoxMain>
      <BoxHeader>
        <SearchInput placeHolder={"Buscar cliente"} />
        <div className="text-base text-gray-500 font-semibold">
          {messages}
        </div>
        <BackButton label={"Voltar"} path={"/clientes"} />
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
            {clientes &&
              clientes.map((cliente: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="pl-4 text-gray-700 font-medium">
                    {cliente?.nome}{cliente.id}
                  </TableCell>
                  <TableCell>{cliente?.email}</TableCell>
                  <TableCell>{cliente?.cpf}</TableCell>
                  <TableCell>{cliente?.telefone}</TableCell>
                  <TableCell className="pr-4">
                    {moment(cliente?.createdAt).format(
                      'DD/MM/YYYY',
                    )}
                  </TableCell>
                  <TableCell className="flex items-center justify-end pr-3 gap-2">
                    <OrderClient
                      label={'Ordens'}
                      path={`/ordens/${cliente?.id}`}
                      name='cliente'
                    />
                    <EditButton
                      label={'Editar'}
                      path={`/clientes/${cliente?.id}`}
                      name='cliente'
                    />
                    <DeleteButton
                      label={'Excluir'}
                      id={cliente?.id}
                      name='cliente'
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </BoxContent>
    </BoxMain>
  )
}

export default SearchPage