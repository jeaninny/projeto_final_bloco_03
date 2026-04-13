import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProduto() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber todos as categorias persistidas no Backend
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // Estado que irá receber os dados da categoria no meu Backend
    // Esse estado é responsável por armazenar os dados da categoria que será associada ao produto.
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', });

    // Estado que irá receber todos os produtos persistidas no Backend
    const [produto, setProduto] = useState<Produto>({} as Produto)

    // Acessar o parâmetro id da rota de edição
    const { id } = useParams<{ id: string }>();


    // Função para buscar una categoria pelo id no backend
    // que será atualizado no form
    async function buscarCategoriaPorId(id: string) {
        try {
            setIsLoading(true);
            await buscar(`/categorias/${id}`, setCategoria);

        } catch (error: any) {
            console.log(error)

        } finally {
            setIsLoading(false);
        }
    }

    // Função para buscar todas as categorias no backend
    async function buscarCategorias() {
        try {
            setIsLoading(true);
            await buscar('/categorias', setCategorias);
        } catch (error: any) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    // Função para buscar um produto pelo id no backend
    // que será atualizado no form

    async function buscarProdutoPorId(id: string) {
        try {
            setIsLoading(true);
            await buscar(`/produtos/${id}`, setProduto);
        } catch (error: any) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    //  Cria um useEffect para monitorar as Categorias no select e Produto no formulário (busca produto por id)
    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])


    // Cria um useEffect para atualizar a categoria do produto sempre que a categoria for
    // atualizada
    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria
        })

    }, [categoria])


    // Função de atualização do estado produto
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { type, value, name } = e.target

        let valor: string | number = value

        if (['number', 'range'].includes(type) || (!isNaN(Number(value)) && value !== '')) {
            valor = parseFloat(Number(value).toFixed(2))
        }
        setProduto({
            ...produto,
            [name]: valor,
            categoria: categoria
        })
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            // Atualização
            try {
                await atualizar('/produtos', produto, setProduto);

                ToastAlerta('Produto atualizado com sucesso!', "sucesso")

            } catch (error: any) {
                ToastAlerta('Erro ao Atualizar o produto!', "erro");

            }

        } else {

            // Cadastro
            try {

                await cadastrar('/produtos', produto, setProduto);

                ToastAlerta('Produto cadastrado com sucesso!', "sucesso")

            } catch (error: any) {
                ToastAlerta('Erro ao Cadastrar o produto!', "erro");
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoCategoria = categoria.nome === '';


    return (
        <>
            <div className="container flex flex-col items-center mx-auto py-8">
                <h1 className="text-2xl font-semibold text-center mb-6 text-slate-800">
                    {id === undefined ? "Cadastrar" : "Editar"} Produto
                </h1>
                <button
                    onClick={retornar}
                    className="bg-indigo-800 text-white px-6 py-2 rounded hover:bg-indigo-950"
                >
                    Voltar
                </button>

                <form className="w-1/2 flex flex-col gap-4"
                    onSubmit={gerarNovoProduto}
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nome" className="text-sm font-medium text-slate-700">
                            Nome
                        </label>
                        <input
                            type="text"
                            placeholder="Nome"
                            name='nome'
                            className="border-2 border-slate-300 rounded p-2 bg-white"
                            value={produto.nome || ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="categoria" className="text-sm font-medium text-slate-700">
                            Categoria do Produto
                        </label>
                        <select
                            name='categoria'
                            id='categoria'
                            className="border-2 border-slate-300 rounded p-2 bg-white"
                            value={categoria.id === 0 ? '' : categoria.id}
                            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                        >
                            <option value="" disabled>Selecione uma Categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="preco" className="text-sm font-medium text-slate-700">
                            Preço
                        </label>
                        <input
                            placeholder="Preço do Produto"
                            type="number"
                            step=".01"
                            name='preco'
                            className="border-2 border-slate-300 rounded p-2 bg-white"
                            value={produto.preco || ''}
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="foto" className="text-sm font-medium text-slate-700">
                            Foto
                        </label>
                        <input
                            type="text"
                            placeholder="Foto"
                            name='foto'
                            className="border-2 border-slate-300 rounded p-2 bg-white"
                            value={produto.foto || ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button
                        type='submit'
                        className={`rounded text-slate-100 w-1/2 py-2 mx-auto flex justify-center 
                            ${carregandoCategoria ? 'bg-indigo-400' : 'bg-indigo-800 hover:bg-indigo-950'}`}
                        disabled={carregandoCategoria}
                    >
                        {isLoading ? <ClipLoader color="#ffffff" size={20} /> : (id === undefined ? 'Cadastrar' : 'Atualizar')}
                    </button>


                </form>

            </div>


        </>
    )
}

export default FormProduto;