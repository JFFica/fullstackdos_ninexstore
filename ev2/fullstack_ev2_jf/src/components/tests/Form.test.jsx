import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Form from '../Form';
import { BrowserRouter } from 'react-router-dom';

const llenarDatos = () => {
  fireEvent.change(screen.getByLabelText(/Nombre\(s\):/i), { target: { value: 'Jorge' } });
  fireEvent.change(screen.getByLabelText(/Apellido\(s\):/i), { target: { value: 'Fuentes' } });
  fireEvent.change(screen.getByLabelText(/Número Telefónico:/i), { target: { value: '987654321' } });
  fireEvent.change(screen.getByLabelText(/Correo Electrónico:/i), { target: { value: 'jorge@duocuc.cl' } });
  fireEvent.change(screen.getByLabelText(/Tipo de Servicio:/i), { target: { value: 'mantencion' } });
  fireEvent.change(screen.getByLabelText(/Fecha de Atención:/i), { target: { value: '2025-12-25' } });
  fireEvent.change(screen.getByLabelText(/Hora de Atención:/i), { target: { value: '15:30' } });
  };

describe('Componente Form', () => {


  
  //Prueba #1: Limpiar después de enviar
  it('Debe limpiar los campos después de un envío exitoso', () => {
    render(<BrowserRouter><Form /></BrowserRouter>);
    const nombreInput = screen.getByLabelText(/Nombre\(s\):/i);
    const apellidoInput = screen.getByLabelText(/Apellido\(s\):/i);
    const fonoInput = screen.getByLabelText(/Número Telefónico:/i);
    const correoInput = screen.getByLabelText(/Correo Electrónico:/i);
    const servicioSelect = screen.getByLabelText(/Tipo de Servicio:/i);
    const fechaInput = screen.getByLabelText(/Fecha de Atención:/i);
    const horaInput = screen.getByLabelText(/Hora de Atención:/i);
    const botonEnviar = screen.getByRole('button', { name: /Enviar/i });

    //Rellenado del formulario con datos válidos
    llenarDatos();
    fireEvent.click(botonEnviar);

    expect(nombreInput.value).toBe('');
    expect(apellidoInput.value).toBe('');
    expect(fonoInput.value).toBe('9');
    expect(correoInput.value).toBe('');
    expect(servicioSelect.value).toBe('');
  });

  //Prueba #2: Mensaje de error si hay un campo vacío
  it('Debe mostrar un mensaje de error si los campos están vacíos', () => {
    render(<BrowserRouter><Form /></BrowserRouter>);
    const botonEnviar = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(botonEnviar);
    
    const mensajeError = screen.getByText(/Advertencia: Todos los campos son obligatorios./i);
    expect(mensajeError).toBeInTheDocument();
  });


  // Prueba #3: Mensaje de error si el correo es inválido
  it('Debe mostrar un mensaje de error con un correo inválido', () => {
    render(<BrowserRouter><Form /></BrowserRouter>);
    
    llenarDatos();

    const correoInput = screen.getByLabelText(/Correo Electrónico:/i);
    fireEvent.change(correoInput, { target: { value: 'correo@invalido.com' } });
    
    const botonEnviar = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(botonEnviar);

    const mensajeError = screen.getByText(/Solo admitimos correos con el dominio @duocuc.cl/i);
    expect(mensajeError).toBeInTheDocument();
  });

  //Prueba #4: Mensaje de error si el teléfono es muy corto
  it('Debe mostrar un mensaje de error si el teléfono no tiene 9 dígitos', () => {
    render(<BrowserRouter><Form /></BrowserRouter>);

    llenarDatos();
    const fonoInput = screen.getByLabelText(/Número Telefónico:/i);
    fireEvent.change(fonoInput, { target: { value: '98765' } });

    const botonEnviar = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(botonEnviar);

    const mensajeError = screen.getByText(/Advertencia: El teléfono debe tener 9 dígitos./i);
    expect(mensajeError).toBeInTheDocument();
  });

  // Prueba #5: Mensaje de éxito
  it('Debe mostrar un mensaje de éxito al enviar datos válidos', () => {
      render(<BrowserRouter><Form /></BrowserRouter>);

      llenarDatos();
      
      const botonEnviar = screen.getByRole('button', { name: /Enviar/i });
      fireEvent.click(botonEnviar);

      const mensajeExito = screen.getByText(/¡Listo, Jorge Fuentes!/i);
      expect(mensajeExito).toBeInTheDocument();
  });

});