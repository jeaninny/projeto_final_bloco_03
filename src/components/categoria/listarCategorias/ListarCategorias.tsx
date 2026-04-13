import { useEffect, useState } from "react";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import CardCategoria from "../cardcategoria/CardCategoria";

function ListarCategorias() {

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber todos as Categorias persistidas no Backend
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // Cria um useEffect para inicializar a função buscar categorias
    useEffect(() => {
        buscarCategorias();
    }, [])

    // Função para buscar todos as categorias no backend
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

    return (
        <>
            {
                isLoading && (
                    <div className="flex justify-center items-center w-full my-8">
                        <SyncLoader
                            color="#3730a3"
                            size={32}
                        />
                    </div>
                )
            }

            <div className="flex justify-center w-full px-4 my-4 bg-slate-200 min-h-screen">
                <div className="container flex flex-col">

                    {
                        (!isLoading && categorias.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhuma Categoria foi encontrada!
                            </span>
                        )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {
                            categorias.map((categoria) => (
                                <CardCategoria key={categoria.id} categoria={categoria} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListarCategorias;