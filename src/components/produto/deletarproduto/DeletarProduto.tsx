import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { XIcon, CheckIcon } from '@phosphor-icons/react'
import type Produto from "../../../models/Produto";
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarProduto() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber os dados do produto que será persistido no Backend
    const [produto, setProduto] = useState<Produto>({} as Produto);

    // Acessar o parâmetro id da rota de edição do Produto
    const { id } = useParams<{ id: string }>();

    // Função para buscar um produto pelo id no backend

    async function buscarProdutoPorId() {
        try {

            setIsLoading(true);

            await buscar(`/produtos/${id}`, setProduto)

        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarProdutoPorId();
        }
    }, [id])

    function retornar() {
        navigate('/produtos');
    }

    async function deletarProduto() {

        setIsLoading(true);

        try {

            await deletar(`/produtos/${id}`);

            ToastAlerta('Produto deletado com sucesso!', "sucesso")

        } catch (error: any) {
            console.log(error)
        }
        setIsLoading(false);
        retornar()
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar produto</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-indigo-800 text-white font-bold text-lg'>
                    Produto
                </header>
                <p className='p-8 text-3xl bg-white h-full'>{produto.nome}</p>
                <div className="flex">
                    <button
                        className='w-full bg-red-400 flex justify-center py-2 text-white'
                        onClick={retornar}
                    >
                        <XIcon size={24} />
                    </button>
                    <button
                        className='w-full bg-indigo-400 flex justify-center py-2 text-white'
                        onClick={deletarProduto}
                    >
                        {
                            isLoading ?
                                <ClipLoader
                                    color="#ffffff"
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
export default DeletarProduto