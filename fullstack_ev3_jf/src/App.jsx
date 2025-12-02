import './App.css'
import './css.css'

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';


import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import FormAccess from './components/FormAccess';
import Footer from './components/Footer';
import Form from './components/Form';


import Login from './components/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProductCardManager from './components/ProductCardManager.jsx';



function PaginaPrincipal() {
    return (
        <>
            <Header/>
            <br />
            <Hero/>
            <br /><br /><br /><br /><br />
            <ProductList />
            <br /><br /><br /><br />
            <FormAccess/>
            <br/><br /><br /><br /><br /><br />
            <Footer />
        </>
    );
}

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<PaginaPrincipal/>} />

                <Route path="/formulario" element={
                    <>
                      <Form/>
                    </>
                } />
               
                <Route path="/login" element={<Login/>} /> 

                <Route path="/manager" element={
                    <ProtectedRoute> 
                        <ProductCardManager/>
                    </ProtectedRoute>
                } />
                <Route path="*" element={<PaginaPrincipal/>} />
            </Routes>
        </main>
    );
}

export default App;