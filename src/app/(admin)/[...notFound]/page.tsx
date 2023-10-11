
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="fixed flex items-center justify-center top-0 right-0 bottom-0 left-0 z-20 bg-blue-dark">
      <div className="flex flex-col items-center">
        <h2 className="text-8xl font-extrabold text-gray-dark font-outline-404 drop-shadow-md">404</h2>
        <p className="text-base font-normal text-gray-middle w-2/5 text-center my-8">
        Receio que você não tenha encontrado a página que procurava. Isso pode acontecer quando você insere dados na url e/ou não exista ou já foi excluído. Ou algum link que estava incorreto.
        </p>
        <Link href="/" className="text-sm text-gray-middle px-8 py-2 rounded-full border-2 border-gray-middle hover:underline">
          Retorne para a página inicial
        </Link>
      </div>
    </div>
  )
}