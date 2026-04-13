import { Link } from "react-router-dom"
import { FirstAidIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from "@phosphor-icons/react"

function Navbar() {


    return (
        <>
            <div className='w-full flex py-4
            			   bg-indigo-900 text-white'>

                <div className="w-full flex justify-between items-center px-8 text-lg">

                    <Link to="/home" className="flex items-center gap-2 text-2xl font-bold">
                        <div className="bg-red-500 p-1 rounded">
                            <FirstAidIcon color="white" size={32} />
                        </div>
                        FARMÁCIA
                    </Link>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Procurar"                            
                            className="border rounded pl-4 w-100 bg-white text-black"
                        />
                        <button className="flex">
                            <MagnifyingGlassIcon size={32} weight="bold" color="#3b82f6" />
                        </button>
                    </div>


                    <div className='flex gap-4'>
                        <Link to='/categorias' className='hover:underline'>Categorias</Link>
                        <Link to='/cadastrarcategoria' className='hover:underline'>Cadastrar Categoria</Link>
                        <UserIcon size={32} />
                        <ShoppingCartIcon size={32} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar