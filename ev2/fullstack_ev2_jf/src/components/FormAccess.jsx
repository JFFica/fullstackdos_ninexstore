import formularioImg from '../assets/u2.png';
import { Link } from 'react-router-dom';


function FormAccess() {
  return (
    <div id="naveg">
      <table id="tablaform">
        <tbody>
          <tr>
            <td>
              <center><h2 id="formuu">Agenda tu hora de Servicio Técnico aquí</h2></center>
            </td>
          </tr>
          <tr>
            <td>
              <center>
                <Link to="/formulario">
                  <img
                    src={formularioImg}
                    width="60%"
                    alt="Ir al Formulario"
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FormAccess;