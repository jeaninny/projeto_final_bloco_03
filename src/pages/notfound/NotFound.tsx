import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-4">
            <h1 className="text-6xl font-bold text-indigo-800">404</h1>
            <p className="text-2xl text-slate-700">Página não encontrada!</p>
            <Link to="/home">
                <button className="bg-indigo-800 text-white px-6 py-2 rounded hover:bg-indigo-950">
                    Voltar para Home
                </button>
            </Link>
        </div>
    )
}

export default NotFound