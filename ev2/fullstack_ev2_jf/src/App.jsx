import './App.css'
import './css.css'

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import FormAccess from './components/FormAccess';
import Footer from './components/Footer';
import Form from './components/Form';


function PaginaPrincipal() {
  return (
    <>
      <Header />
      <br />
      <Hero />
      <br /><br /><br /><br /><br />
      <ProductList />
      <br /><br /><br /><br />
      <FormAccess />
    </>
  );
}


function App() {
  return (
   <main>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />

        <Route path="/formulario" element={
          <>
            <Form />
          </>
        } />
      </Routes>
      <br /><br /><br /><br /><br /><br />
      <Footer />
    </main>
  );
}

export default App;