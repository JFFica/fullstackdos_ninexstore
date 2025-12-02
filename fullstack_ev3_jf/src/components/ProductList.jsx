import ProductCard from './ProductCard';
import { productos } from '../data/productos.js';


function ProductList() {
  return (
    <section id="productos">
      <h1 style={{ textAlign: 'center' }}>Productos Destacados</h1>
      <br />
      <div className="destacados">
        <div className="fila-catalogo">
          {productos.map(producto => (
            <ProductCard
              key={producto.id}
              imagen={producto.imagen}
              nombre={producto.nombre}
              precio={producto.precio}
            />
          ))}
        </div>
      </div>
      <br /><br />
      <div style={{ textAlign: 'center' }}>
        <button type="button" id="btnCatalogo" className="btn">Ir al Catálogo Completo</button>
      </div>
    </section>
  );
}

export default ProductList;