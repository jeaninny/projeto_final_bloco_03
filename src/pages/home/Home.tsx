import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className="bg-cyan-100 flex justify-center items-center w-full">
                <div className='container grid grid-cols-1 md:grid-cols-2'>

                    <div className="flex justify-center pb-4 md:pb-0 order-first md:order-last">
                        <img
                            src="https://ik.imagekit.io/jeaninny/produtos_farmacia/home.png"
                            alt="Imagem Página Home"
                            className='w-1/2 md:w-2/3'
                        />
                    </div>

                    <div className="flex flex-col gap-4 items-center justify-center py-4 text-center md:text-left order-last md:order-first">
                        <h2 className='text-3xl md:text-5xl font-bold'>
                            Seja Bem-Vindo!
                        </h2>
                        <p className='text-base md:text-xl'>
                            Aqui você encontra Medicamentos e Cosméticos!
                        </p>                        

                        <div className="flex gap-4">
                            <Link to="/cadastrarproduto">
                                <button className='bg-indigo-800 rounded text-white py-2 px-4 hover:bg-indigo-950'>
                                    + Produto
                                </button>
                            </Link>
                            <Link to="/cadastrarcategoria">
                                <button className='bg-indigo-800 rounded text-white py-2 px-4 hover:bg-indigo-950'>
                                    + Categoria
                                </button>
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Home