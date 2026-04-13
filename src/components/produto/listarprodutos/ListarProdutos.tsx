import { useEffect, useState } from "react";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import CardProduto from "../cardproduto/CardProduto";
import { useSearchParams } from 'react-router-dom'

function ListarProdutos() {

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber todos os produtos persistidas no Backend
    const [produtos, setProdutos] = useState<Produto[]>([]);

    // Lê o parâmetro de busca da URL (ex: /produtos?busca=vitamina)
    const [searchParams] = useSearchParams()
    const busca = searchParams.get('busca') || ''

    // Monitora o termo de busca: se houver termo, busca por nome no backend;
    // caso contrário, busca todos os produtos
    useEffect(() => {
        if (busca !== '') {
            setIsLoading(true)
            buscar(`/produtos/nome/${busca}`, setProdutos)
                .finally(() => setIsLoading(false))
        } else {
            buscarProdutos()
        }
    }, [busca])
    // Função para buscar todos os produtos no backend
    async function buscarProdutos() {
        try {
            setIsLoading(true);
            await buscar('/produtos', setProdutos);

        } catch (error: any) {
            console.log(error)

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                isLoading && (
                    <div className="flex justify-center items-center w-full my-8">
                        <SyncLoader
                            color="#ffffff"
                            size={32}
                        />
                    </div>
                )
            }

            <div className="flex justify-center w-full px-4 my-4 bg-slate-200 min-h-screen">
                <div className="container flex flex-col">

                    {
                        (!isLoading && produtos.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Produto foi encontrado!
                            </span>
                        )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">

                        {
                            produtos.map((produto) => (
                                <CardProduto key={produto.id} produto={produto} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListarProdutos;