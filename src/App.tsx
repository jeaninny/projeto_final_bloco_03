import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import ListarCategorias from './components/categoria/listarCategorias/ListarCategorias'
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'
import { ToastContainer } from 'react-toastify'
import ListarProdutos from './components/produto/listarprodutos/ListarProdutos'
import FormProduto from './components/produto/formproduto/FormProduto'
import DeletarProduto from './components/produto/deletarproduto/DeletarProduto'
import NotFound from './pages/notfound/NotFound'

function App() {


  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/categorias" element={<ListarCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/produtos" element={<ListarProdutos />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App