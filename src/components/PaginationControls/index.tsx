'use client';

import {FC} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

interface PaginationControlsProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    hasLength: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
    hasNextPage,
    hasPrevPage,
    hasLength,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '5';

    return (
        <div className="flex items-center justify-center w-full gap-2">
            <button
                className="text-gray-600 py-1.5 px-3 text-sm"
                disabled={!hasPrevPage}
                onClick={() => {
                    router.push(`/clientes?page=${Number(page) - 1}`);
                }}
            >
                Anterior
            </button>

            <div className="text-sm text-gray-600 border rounded-full py-1 px-2">
                {page} de {Math.ceil(hasLength / Number(per_page))}
            </div>

            <button
                className="text-gray-600 py-1.5 px-3 text-sm"
                disabled={!hasNextPage}
                onClick={() => {
                    router.push(`/clientes?page=${Number(page) + 1}`);
                }}
            >
                Próximo
            </button>
        </div>
    );
};

export default PaginationControls;
