export const $ = (sel) => document.querySelector(sel);

const mensaje = $('#mensaje');
const form = $('form');

const btnLimpiar = $('#btnLimpiar');


//Bloquear fechas pasadas
const hoy = new Date().toISOString().split('T')[0];
fecha.setAttribute('min', hoy)

//Siempre empezar con 9
fono.addEventListener('input', () => {
    if (!fono.value.startsWith("9")) {
        fono.value = "9";
    }
});


function correoValido(email) {
  const validar = (email || "").trim().toLowerCase();
  return /^[^\s@]+@(duocuc\.cl)$/.test(validar);
}


btnLimpiar.addEventListener('click', () => {
    form.reset();
    mensaje.textContent = '';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = $('#nombre').value.trim();
    const apellido = $('#apellido').value.trim();
    const fono = $('#fono').value.trim();
    const correo = $('#correo').value.trim();
    const servicio = $('#servicio').value;
    const fecha = $('#fecha').value;
    const hora = $('#hora').value;

    

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    //VALIDACIONES: Nombre
    if (!nombre) {
        mensaje.textContent = 'Advertencia: Debe ingresar su nombre.';
        return;
    }
    if(nombre.length>30){
        mensaje.textContent = 'Advertencia: Su nombre ingresado es demasiado extenso.';
        return;
    }
    if (!soloLetras.test(nombre)) {
        mensaje.textContent = 'Advertencia: El nombre solo puede contener letras.';
        return;
    }

    //VALIDACIONES: Apellido
    if (!apellido) {
        mensaje.textContent = 'Advertencia: Debe ingresar su apellido.';
        return;
    }
    if(apellido.length>30){
        mensaje.textContent = 'Advertencia: Su apellido ingresado es demasiado extenso.';
        return;
    }

    if (!soloLetras.test(apellido)) {
        mensaje.textContent = 'Advertencia: El apellido solo puede contener letras.';
        return;
    }

    //VALIDACIONES: Teléfono
    const soloNumeros = /^[0-9]+$/;
    if(!soloNumeros.test(fono)){
        mensaje.textContent = 'Advertencia: El teléfono solo puede contener digitos.';
        return;
    }

    if (fono.length !== 9) {
        mensaje.textContent = 'Advertencia: El teléfono debe tener exactamente 9 dígitos.\n(contando el prefijo)';
        return;
    }

    //VALIDACIONES: Correo
    if (!correo) {
        mensaje.textContent = 'Advertencia: Falta ingresar su correo electrónico.';
        return;
    }
    if (!correoValido(correo)) {
        mensaje.textContent = 'Advertencia: Solo admitimos correos con el dominio @duocuc.cl';
        return;
    }

    //VALIDACIONES: Servicio
    if(servicio==""){
        mensaje.textContent = 'Advertencia: Debe seleccionar un servicio.';
        return;
    }

    //VALIDACIONES: Fecha
    if (!fecha) {
        mensaje.textContent = 'Advertencia: Debe seleccionar una fecha.';
        return;
    }

    //VALIDACIONES: Hora
    if (!hora) {
        mensaje.textContent = 'Advertencia: Debe seleccionar una hora.';
        return;
    }
    const formatoHora = /^(?:1[0-8]:(?:00|30)|19:00)$/;
    if (!formatoHora.test(hora)) {
        mensaje.textContent = 'Advertencia: Solo atendemos de 10:00 a 19:00 hrs, y agendamos en intervalos de 30 min (ej: 15:30 / 16:00).';
        return;
    }

    
    mensaje.textContent = `¡Listo, ${nombre} ${apellido}! Su cita para ${servicio} está agendada para el ${fecha} a las ${hora} hrs.`;

    form.reset();
});