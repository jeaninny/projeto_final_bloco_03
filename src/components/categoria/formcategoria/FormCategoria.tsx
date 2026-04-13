import { useState, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";

function FormCategoria() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber os dados da categoria que será persistida no Backend
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    // Acessar o parâmetro id da rota de edição da categoria
    const { id } = useParams<{ id: string }>();

    // Função para buscar uma categoria pelo id no backend
    // que será atualizada no form
    async function buscarCategoriaPorId() {
        try {
            setIsLoading(true);

            await buscar(`/categorias/${id}`, setCategoria);

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

    // Função de atualização do estado Categoria
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovaCategoria(e: SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            // Atualização
            try {

                await atualizar('/categorias', categoria, setCategoria);

                alert('Categoria atualizada com sucesso!')

            } catch (error: any) {
                alert('Erro ao Atualizar a Categoria!');
            }

        } else {

            // Cadastro
            try {
                await cadastrar('/categorias', categoria, setCategoria);
                alert('Categoria cadastrada com sucesso!')

            } catch (error: any) {
                alert('Erro ao Cadastrar a Categoria!');
            }

        }
        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate('/categorias');
    }

    return (
        <div className="container flex flex-col items-center justify-start mx-auto pt-8">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar" : "Editar"} Categoria
            </h1>

            <form className="w-full flex flex-col gap-4"
                onSubmit={gerarNovaCategoria}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Categoria</label>
                    <input
                        type="text"
                        name='nome'
                        placeholder="Categoria"
                        className="border-2 border-slate-700 rounded p-2 bg-white"
                        value={categoria.nome || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-800 hover:bg-indigo-950
                    w-1/3 py-1 mx-auto flex justify-center"
                    type="submit">

                    {
                        isLoading ?

                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            />

                            :

                            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>

                    }

                </button>
            </form>
        </div>
    );
}

export default FormCategoria;