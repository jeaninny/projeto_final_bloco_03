import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { XIcon, CheckIcon } from '@phosphor-icons/react'

function DeletarCategoria() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber os dados da categoria que será persistida no Backend
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    // Acessar o parâmetro id da rota de edição da Categoria
    const { id } = useParams<{ id: string }>();

    // Função para buscar um categoria pelo id no backend
    // que será atualizada no form
    async function buscarCategoriaPorId() {
        try {

            setIsLoading(true);

            await buscar(`/categorias/${id}`, setCategoria)

        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarCategoriaPorId();
        }
    }, [id])

    function retornar() {
        navigate('/categorias');
    }

    async function deletarCategoria() {

        setIsLoading(true);

        try {

            await deletar(`/categorias/${id}`);

            alert('Categoria deletada com sucesso!')

        } catch (error: any) {
            console.log(error)
        }
        setIsLoading(false);
        retornar()
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar categoria</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-indigo-800 text-white font-bold text-lg'>
                    Categoria
                </header>
                <p className='p-8 text-3xl bg-white h-full'>{categoria.nome}</p>
                <div className="flex">
                    <button
                        className='w-full bg-red-400 flex justify-center py-2 text-white'
                        onClick={retornar}
                    >
                        <XIcon size={24} />
                    </button>
                    <button
                        className='w-full bg-indigo-400 flex justify-center py-2 text-white'
                        onClick={deletarCategoria}
                    >
                        {
                            isLoading ?
                                <ClipLoader
                                    color="#3730a3"
                                    size={32}
                                />
                                :
                                <CheckIcon size={24} />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarCategoria