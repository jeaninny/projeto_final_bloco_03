import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react'

interface CardCategoriaProps {
    categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
    return (
        <div className='border flex flex-col rounded-2xl bg-slate-200 overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-lg'>
                Categoria
            </header>
            <p className='p-8 text-3xl bg-white h-full'>{categoria.nome}</p>

            <div className="flex bg-indigo-800 justify-center gap-6 py-2">
                <Link to={`/editarcategoria/${categoria.id}`}
                    className='text-slate-100'>
                    <PencilSimpleIcon size={24} />
                </Link>

                <Link to={`/deletarcategoria/${categoria.id}`}
                    className='text-slate-100'>
                    <TrashIcon size={24} />
                </Link>
            </div>

        </div>
    )
}

export default CardCategoria