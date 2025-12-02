import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const navigate = useNavigate();

const handleLogin = async (e) => {
  // 1) Evita que el form recargue la página
  e.preventDefault(); // 👈 minúsculas, y NO comentar

  try {
    // 2) Llamada al endpoint (usa proxy en dev: '/auth/login' para evitar CORS)
    const resp = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // sugiere al server devolver JSON
      },
      body: JSON.stringify({ username, password }),
    });

    // 3) Si la API responde con error HTTP, lo lanzamos
    if (!resp.ok) {
      const errText = await resp.text().catch(() => '');
      throw new Error(`Login fallido (${resp.status}) ${errText}`);
    }

    // 4) Intenta parsear JSON; si no hay cuerpo (204 o texto plano), no rompas
    let data = null;
    const text = await resp.text();           // leemos el cuerpo una sola vez
    if (text && text.trim().length > 0) {
      try {
        data = JSON.parse(text);              // parse seguro
      } catch (parseErr) {
        console.warn('Respuesta no-JSON:', text);
      }
    }

    // 5) Extrae token (según cómo lo llame tu API)
    const token = data?.accessToken || data?.token;
    if (!token) {
      // Si tu API devuelve el token en header, puedes leerlo así:
      const headerToken = resp.headers.get('Authorization'); // ej: "Bearer xxx"
      if (headerToken?.startsWith('Bearer ')) {
        localStorage.setItem('token', headerToken.slice(7));
      } else {
        throw new Error('No se encontró token en la respuesta.');
      }
    } else {
      localStorage.setItem('token', token);
    }

    // 6) Navega a la página protegida
    navigate('/manager');

  } catch (err) {
    console.error(err);
    alert('❌ Credenciales inválidas o error de servidor');
  }
};

return(
    <div className="login-card container mt-5" style={{maxWidth: "480px"}}> 
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label className="form-label">Usuario: </label>
                <input type="text" 
                className="form-control" // Mantén form-control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese el usuario"/>
            </div>
            <br/><br/>
            <div className="mb-3">
                <label className="form-label">Contraseña: </label>
                <input type="password" 
                className="form-control" // Mantén form-control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese la contraseña"/>
            </div>
            <button type="submit" className="btn-submit">Ingresar</button> 
        </form>
    </div>
);

}
export default Login;