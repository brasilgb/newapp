'use client';

const Error = () => {
    return (
        <div className="fixed flex items-center justify-center top-0 right-0 bottom-0 left-0 z-20 bg-blue-dark">
            <div className="flex flex-col items-center">
                <h2 className="text-4xl uppercase font-extrabold text-gray-dark font-outline-404 drop-shadow-md">
                    Algo deu errado
                </h2>
                <p className="text-base font-normal text-gray-middle w-2/5 text-center my-8">
                    Houve um erro em sua aplicação. Isso pode acontecer quando o
                    banco de dados não foi inicializado corretamente, ou a
                    conexão de rede tenha sido interrompida.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-sm text-gray-middle px-8 py-2 rounded-full border-2 border-gray-middle hover:underline"
                >
                    Tente novamente
                </button>
            </div>
        </div>
    );
};

export default Error;
