import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

//Prueba #9: Enlaces de contacto
  it('Debe contener los enlaces correctos para ubicación y WhatsApp', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);

    const linkUbicacion = screen.getByAltText(/Ubicación/i).closest('a');
    const linkWhatsApp = screen.getByAltText(/WhatsApp/i).closest('a');

    expect(linkUbicacion).toHaveAttribute('href', 'https://n9.cl/vqj9vo');
    expect(linkWhatsApp).toHaveAttribute('href', expect.stringContaining('https://api.whatsapp.com'));
  });