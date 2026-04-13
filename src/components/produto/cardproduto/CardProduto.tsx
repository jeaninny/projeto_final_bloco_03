import { Link } from "react-router-dom"
import type Produto from "../../../models/Produto"
import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react'

interface CardProdutosProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {

    return (
        <div className="flex flex-col rounded-2xl overflow-hidden border justify-between">
            <div className="flex w-full bg-indigo-800 text-white py-2 px-4 items-center gap-4">
                <img
                    src={produto.foto}
                    className='h-12 rounded-full'
                    alt="" />
                <h3 className='text-lg font-bold text-center uppercase'>
                    {produto.nome}
                </h3>
            </div>
            <div className='p-4 '>
                <p><span className="font-semibold">Categoria:</span> {produto.categoria?.nome}</p>
                <p><span className="font-semibold">Preço:</span>{Number(produto.preco).
                    toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </p>
            </div>

            <div className="flex">
                <Link to={`/editarproduto/${produto.id}`}
                    className='w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <PencilSimpleIcon size={24} />
                </Link>
                <Link to={`/deletarproduto/${produto.id}`}
                    className='w-full text-white bg-red-400 hover:bg-red-700 flex items-center justify-center py-2'>
                    <TrashIcon size={24} />
                </Link>
            </div>
        </div>
    )
}

export default CardProduto