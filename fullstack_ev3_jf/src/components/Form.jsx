import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Form() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fono, setFono] = useState('9');
  const [correo, setCorreo] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const [mensaje, setMensaje] = useState('');

  const enviar = (e) => {
    e.preventDefault();

    // Parámetros de entrada
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const formatoHora = /^(?:1[0-8]:(?:00|30)|19:00)$/;
    const correoValido = (email) => /^[^\s@]+@(duocuc\.cl)$/.test(email.toLowerCase());

    if (!nombre.trim() || !apellido.trim() || !fono.trim() || !correo.trim() || !servicio || !fecha || !hora.trim()) {
      setMensaje('Advertencia: Todos los campos son obligatorios.');
      return;
    }
    if (!soloLetras.test(nombre)) {
        setMensaje('Advertencia: El nombre solo puede contener letras.');
        return;
    }
    if (!soloLetras.test(apellido)) {
        setMensaje('Advertencia: El apellido solo puede contener letras.');
        return;
    }
    if (!soloNumeros.test(fono) || fono.length !== 9) {
        setMensaje('Advertencia: El teléfono debe tener 9 dígitos.');
        return;
    }
    if (!correoValido(correo)) {
        setMensaje('Advertencia: Solo admitimos correos con el dominio @duocuc.cl');
        return;
    }
    if (!formatoHora.test(hora)) {
        setMensaje('Advertencia: Hora no válida. Atendemos de 10:00 a 19:00 en intervalos de 30 min.');
        return;
    }
    
    setMensaje(`¡Listo, ${nombre} ${apellido}! Su cita para ${servicio} está agendada para el ${fecha} a las ${hora} hrs.`);
    
    limpiar();
  };

  const limpiar = () => {
    setNombre('');
    setApellido('');
    setFono('9');
    setCorreo('');
    setServicio('');
    setFecha('');
    setHora('');
  };


  return (
    <section>
      <form onSubmit={enviar}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="nombre">Nombre(s): </label></td>
              <td>
                <input 
                  type="text" 
                  id="nombre" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="apellido">Apellido(s):</label></td>
              <td>
                <input 
                  type="text" 
                  id="apellido" 
                  value={apellido} 
                  onChange={(e) => setApellido(e.target.value)} 
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="fono">Número Telefónico:</label></td>
              <td>
                <input 
                  type="text" 
                  id="fono" 
                  maxLength="9"
                  value={fono} 
                  onChange={(e) => {
                    if (e.target.value.startsWith('9') || e.target.value === '') {
                      setFono(e.target.value)
                    }
                  }} 
                />
              </td>
            </tr>
            <tr>
                <td><label htmlFor="correo">Correo Electrónico:</label></td>
                <td>
                    <input 
                        type="email" 
                        id="correo" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                    />
                </td>
            </tr>
          </tbody>
        </table>

        <table>
            <tbody>
                <tr>
                    <td><label htmlFor="servicio">Tipo de Servicio:</label></td>
                    <td>
                        <select id="servicio" value={servicio} onChange={(e) => setServicio(e.target.value)}>
                            <option value="">Seleccione</option>
                            <option value="mantencion">Mantención</option>
                            <option value="instalacion">Instalación de Componentes</option>
                            <option value="limpieza">Limpieza Interna</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="fecha">Fecha de Atención:</label></td>
                    <td><input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} min={new Date().toISOString().split('T')[0]}/></td>
                </tr>
                <tr>
                    <td><label htmlFor="hora">Hora de Atención:</label></td>
                    <td><input type="text" id="hora" placeholder="HH:MM" value={hora} onChange={(e) => setHora(e.target.value)}/></td>
                </tr>
            </tbody>
        </table>

        <div className="botones">
          <button type="submit" className="btn-submit">Enviar</button>
          <button type="button" onClick={limpiar} className="btn-reset">Limpiar</button>
        </div>
        
        {mensaje && <div id="mensaje">{mensaje}</div>}
      </form>
    <center style={{ marginTop: '40px' }}>
        <Link to="/" className="btn">Volver a la Página Principal</Link>
      </center>
    </section>
  );
}

export default Form;