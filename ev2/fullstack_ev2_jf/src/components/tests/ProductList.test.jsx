import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductList from '../ProductList';

describe('Componente ProductList', () => {

    //Prueba #10: Tarjeta de productos
    it('Deben haber 6 tarjetas en los productos destacados', () => {
    render(<ProductList />);

    const productos = screen.getAllByRole('heading', { level: 4 });

    expect(productos).toHaveLength(6);
});

});