import ubicacion from '../assets/ubication.png';
import whatsapp from '../assets/whatsapp.png';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <table id="uyc">
          <tbody>
            <tr>
              <td>
                <a href="https://n9.cl/vqj9vo" target="_blank" rel="noopener noreferrer">
                  <img src={ubicacion} width="50" alt="Ubicación" />
                </a>
              </td>
              <td>
                <a href="https://api.whatsapp.com/send?phone=56912345678&text=%C2%A1Hola,%20NinexStore!%20Tengo%20una%20consulta." target="_blank" rel="noopener noreferrer">
                  <img src={whatsapp} width="50" alt="WhatsApp" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <h6>© 2025 NinexStore - Todos los derechos reservados</h6>
      </div>
    </footer>
  );
}

export default Footer;