import logo from '../assets/logo.png';

function Header() {
  return (
    <>
      <header>
        <img src={logo} width="15%" alt="Logo NinexStore" id="inicio" />
        <h1><strong>NinexStore</strong></h1>
      </header>
      <nav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#naveg">Servicio Técnico</a></li>
          <li><a href="#uyc">Ubicación y Contacto</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;