'use client';
import Link from 'next/link';
import React from 'react';

const Error = () => {
    return (
        <div className="fixed flex items-center justify-center top-0 right-0 bottom-0 left-0 z-20 bg-blue-dark">
            <div className="flex flex-col items-center">
                <h2 className="text-8xl font-extrabold text-gray-dark font-outline-404 drop-shadow-md">
                    Erro
                </h2>
                <p className="text-base font-normal text-gray-middle w-2/5 text-center my-8">
                    Houve um erro em sua aplicação. Isso pode acontecer quando o
                    banco de dados não foi inicializado corretamente, ou a
                    conexão de rede tenha sido interrompida. Caso o erro
                    persista contate o suporte.
                </p>
                <Link
                    href="/"
                    className="text-sm text-gray-middle px-8 py-2 rounded-full border-2 border-gray-middle hover:underline"
                >
                    Retorne para a página inicial
                </Link>
            </div>
        </div>
    );
};

export default Error;
