import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
describe('Componente Header', () => {


  //Prueba #6: Elementos de la barra de Navegación
  it('Debe verificar la existencia de todos los enlaces de navegación', () => {
    
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // se busca cada uno de los enlaces por su texto.
    const linkInicio = screen.getByRole('link', { name: /Inicio/i });
    const linkProductos = screen.getByRole('link', { name: /Productos/i });
    const linkServicio = screen.getByRole('link', { name: /Servicio Técnico/i });
    const linkUbicacion = screen.getByRole('link', { name: /Ubicación y Contacto/i });

    expect(linkInicio).toBeInTheDocument();
    expect(linkProductos).toBeInTheDocument();
    expect(linkServicio).toBeInTheDocument();
    expect(linkUbicacion).toBeInTheDocument();
  });


  // Prueba #7: Hipervinculos en la barra de navegación
  it('Debe tener los enlaces apuntando a las secciones correctas', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);

    const linkInicio = screen.getByRole('link', { name: /Inicio/i });
    expect(linkInicio).toHaveAttribute('href', '#inicio');

    const linkProductos = screen.getByRole('link', { name: /Productos/i });
    expect(linkProductos).toHaveAttribute('href', '#productos');

    const linkServicio = screen.getByRole('link', { name: /Servicio Técnico/i });
    expect(linkServicio).toHaveAttribute('href', '#naveg');

    const linkUbicacion = screen.getByRole('link', { name: /Ubicación y Contacto/i });
    expect(linkUbicacion).toHaveAttribute('href', '#uyc');
  });

  // Prueba #8: Logo
  it('Debe mostrar el logo de la tienda', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    const logo = screen.getByAltText(/Logo NinexStore/i);
    expect(logo).toBeInTheDocument();
  });



});