// -------------ABREVIACIONES------------
const src = "http://localhost/gymbook/php/controlador.php?op=";

//Relacionado al header
const inicio_boton = document.getElementById("inicio_boton");
const perfil_boton = document.getElementById("perfil_boton");
const mensajes_boton = document.getElementById("mensajes_boton");
const admin_boton = document.getElementById("admin_boton");

//Relacionado al login
const loginForm = document.getElementById("login_form");
const loginDiv = document.getElementById("formulario_login");
const login_boton = document.getElementById("login_boton");

//Relacionado al registro
const registroForm = document.getElementById("registro_form");
const registroDiv = document.getElementById("formulario_registro");
const desconectar_boton = document.getElementById("desconectar_boton");

//Divs de contenido
const publicaciones = document.getElementById("publicaciones_muro");
const perfil = document.getElementById("perfil");
const mensajes = document.getElementById("mensajes");
const administrar = document.getElementById("administracion");

//Formulario publicacion nueva
const publi_boton = document.getElementById("publi_boton");
const publi_form = document.getElementById("publicacion_form");
const publi_field = document.getElementById("publi_field");
const publi_cancel = document.getElementById("cancelar_publi");
const lista_ejercicios = document.getElementById("lista_ejercicios");
const nueva_peso = document.getElementById("nueva_peso");
const nueva_repe = document.getElementById("nueva_repe");

//Listado de publicaciones
const lista_publi = document.getElementById("listado_publicaciones");

//Perfil
const perfil_div = document.getElementById("perfil");
const perfil_foto = document.getElementById("perfil_foto");
const nombre_perfil = document.getElementById("nombre_perfil");
const editar_perfil = document.getElementById("editar_perfil");
const editar_field = document.getElementById("edicion_datos");
const cancelar_editar = document.getElementById("cancelar_editar");
const lista_publi_perfil = document.getElementById("lista_publi_perfil");

//PERFIL Cambio datos
const form_edit_perfil = document.getElementById("formulario_editar");
const cambio_usuario = document.getElementById("cambio_usuario");
const cambio_pass = document.getElementById("cambio_pass");
const confirm_pass = document.getElementById("confirmar_pass");

// Mensajes
const mensajes_div = document.getElementById("mensajes");
const mensajes_tit = document.getElementById("bandeja");
const recibidos_boton = document.getElementById("recibidos_boton");
const enviados_boton = document.getElementById("enviados_boton");
const nuevo_mensaje = document.getElementById("nuevo_mensaje_boton");
const mensaje_field = document.getElementById("mensaje_field");
const mensaje_form = document.getElementById("mensaje_form");
const cancelar_mensaje = document.getElementById("cancelar_mensaje");
const destinatario = document.getElementById("destinatario_mensaje");
const asunto_mensaje = document.getElementById("asunto_mensaje");
const mensaje_contenido = document.getElementById("mensaje_contenido");
const recibidos_div = document.getElementById("recibidos_div");
const enviados_div = document.getElementById("enviados_div");

// Administracion
const admin_div = document.getElementById("administracion");
const lista_usuarios = document.getElementById("lista_usuarios");
//-----------VARIABLES------------
// De usuario
let id_usuario;
let admin;
let logeado;
let nombre_usuario;
let contrasena_usuario;
let foto_perfil;

// Generales

let activo = publicaciones;

//-------------FUNCIONES--------------

//Activamos el funcionamiento de la página una vez hemos iniciado sesion
function sesionIniciada() {
  console.log("Cargando inicio");
  esAdmin();
  login_boton.style.display = "none";
  loginDiv.style.display = "none";
  desconectar_boton.style.display = "block";
  cargarInicio();
  // Añado los listeners al header para que pueda interactuar una vez haya iniciado sesion
  inicio_boton.addEventListener("click", function () {
    cargarInicio();
  });

  perfil_boton.addEventListener("click", function () {
    cargarPerfil();
  });

  mensajes_boton.addEventListener("click", function () {
    cargarMensajes();
  });
  admin_boton.addEventListener("click", function () {
    cargarAdmin();
  });
  desconectar_boton.addEventListener("click", function () {
    desconectar();
  });
}

// Cargamos la pagina de inicio
function cargarInicio() {
  activo.style.display = "none";
  activo = publicaciones;
  publicaciones.style.display = "block";

  cargarTodasPublicaciones();
}

//Cargamos las publicaciones
function cargarTodasPublicaciones() {
  publicaciones.style.display = "block";
  let recibido = "";
  let srcOperacion = src + "listaPubli";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Mostrando publicaciones");
      recibido = JSON.parse(xhr.responseText);
      pintarPublicaciones(recibido, lista_publi);
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };

  xhr.send();
}

// Pinto las publicaciones
function pintarPublicaciones(recibido, donde) {
  let salida = "";
  for (let i = 0; i < recibido.length; i++) {
    if (recibido[i]["usuario"] == nombre_usuario) {
      salida += `<div class="publicacion" id="${recibido[i]["usuario"]}">
            <img class="perfil_icon" src="${recibido[i]["foto_perfil"]}">
            <p>
                ${recibido[i]["usuario"]} ha hecho ${recibido[i]["repeticiones"]}
                repeticiones en ${recibido[i]["nombre_ejercicio"]} levantando ${recibido[i]["peso"]}KG                
            </p>
            <button type="button" value="${recibido[i]["id_publicacion"]}" onClick="eliminarPubli(this.value)" class="eliminarPubli">X</button>
            </div>`;
    } else {
      salida += `<div class="publicacion" id="${recibido[i]["usuario"]}">
            <img class="perfil_icon" src="${recibido[i]["foto_perfil"]}">
            <p>
                ${recibido[i]["usuario"]} ha hecho ${recibido[i]["repeticiones"]}
                repeticiones en ${recibido[i]["nombre_ejercicio"]} levantando ${recibido[i]["peso"]}KG
            </p>
            </div>`;
    }
  }

  donde.innerHTML = salida;
}

// Elimino la publicación
function eliminarPubli(id) {
  let srcOperacion = src + "eliminarPubli";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Publicación eliminada");
      if (activo == publicaciones) {
        cargarInicio();
      } else {
        cargarPerfil();
      }
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(`{"id_publicacion":${id}}`);
}

// Subimos una nueva publicacion
function nuevaPubli(event, peso, repes, ejercicio) {
  event.preventDefault();
  let srcOperacion = src + "nuevaPubli";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Publicacion enviada");
      cargarTodasPublicaciones();
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(
    `{"usuario":${id_usuario},"peso":${peso}, "repes":${repes}, "ejercicio":${ejercicio}}`
  );
}

// Pintamos los ejercicios
function pintaEjercicios() {
  let recibido = "";
  let srcOperacion = src + "ejercicios";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Ejercicios cargados");
      recibido = JSON.parse(xhr.responseText);
      salida = `<option value="${recibido[0]["id_ejercicio"]}" selected>${recibido[0]["nombre_ejercicio"]}</option>`;
      for (let i = 1; i < recibido.length; i++) {
        salida += `<option value="${recibido[i]["id_ejercicio"]}">${recibido[i]["nombre_ejercicio"]}</option>`;
      }
      lista_ejercicios.innerHTML = salida;
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };
  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send();
}

//-------PERFIL---------

function cargarPerfil() {
  activo.style.display = "none";
  activo = perfil_div;
  perfil_div.style.display = "block";

  nombre_perfil.innerHTML = nombre_usuario;
  perfil_foto.src = foto_perfil;
  cambio_usuario.value = nombre_usuario;
  cambio_pass.value = contrasena_usuario;
  cargarMisPubli();
}

// Cargo una lista de publicaciones pero solo las que he publicado yo
function cargarMisPubli() {
  let recibido = "";

  const xhr = new XMLHttpRequest();

  let srcOperacion = src + "misPubli";

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      //la solicitud ha sido exitosa
      console.log("Cargando publicaciones del perfil");
      recibido = JSON.parse(xhr.responseText);
      pintarPublicaciones(recibido, lista_publi_perfil);
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };

  xhr.send(`{"id_usuario":${id_usuario}}`);
}

// Editar los datos del perfil
function editarPerfil(event) {
  event.preventDefault();
  if (confirm_pass.value != contrasena_usuario) {
    alert("Contraseña incorrecta");
    confirm_pass.style.background = "red";
  } else {
    confirm_pass.style.background = "white";

    const xhr = new XMLHttpRequest();

    let srcOperacion = src + "editarPerfil";

    xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        contrasena_usuario = cambio_pass.value;
        alert("Datos modificados correctamente");
        editar_field.style.display = "none";
        editar_perfil.style.display = "block";
        almacenarSesion(
          id_usuario,
          cambio_usuario.value,
          cambio_pass.value,
          foto_perfil
        );
        cargarPerfil();
      } else {
        console.log("Error: " + xhr.statusText);
      }
    };

    xhr.onerror = function () {
      alert("Error de red");
    };

    xhr.send(
      `{"id_usuario":${id_usuario}, "nombre_usuario":"${cambio_usuario.value}", "contrasena": "${cambio_pass.value}"}`
    );
  }
}

//-----MENSAJES----

function cargarMensajes() {
  activo.style.display = "none";
  activo = mensajes_div;
  mensajes_div.style.display = "block";
  cargarDestinos();
  cargarRecibidos();
}

// Cargo los mensajes recibidos
function cargarRecibidos() {
  enviados_div.style.display = "none";
  recibidos_div.style.display = "block";
  mensajes_tit.innerHTML = "Mensajes recibidos";

  let srcOperacion = src + "cargarRecibidos";
  const xhr = new XMLHttpRequest();

  let recibido = "";
  let salida = "";
  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Mensajes recibidos cargados");
      recibido = JSON.parse(xhr.responseText);
      for (let i = 0; i < recibido.length; i++) {
        salida += `<div class="mensaje_ind">
                        <h3>De: ${recibido[i]["nombre_usuario"]}</h3>
                        <h4>Asunto: ${recibido[i]["asunto"]}</h4>
                        <p>${recibido[i]["contenido"]}</p>
                </div>`;
      }
      recibidos_div.innerHTML = salida;
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };
  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(`{"id_usuario":${id_usuario}}`);
}

// cargo los mensajes enviados
function cargarEnviados() {
  recibidos_div.style.display = "none";
  enviados_div.style.display = "block";
  mensajes_tit.innerHTML = "Mensajes enviados";

  let srcOperacion = src + "cargarEnviados";
  const xhr = new XMLHttpRequest();

  let recibido = "";
  let salida = "";
  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Mensajes recibidos cargados");
      recibido = JSON.parse(xhr.responseText);
      for (let i = 0; i < recibido.length; i++) {
        salida += `<div class="mensaje_ind">
                        <h3>Para: ${recibido[i]["nombre_usuario"]}</h3>
                        <h4>Asunto: ${recibido[i]["asunto"]}</h4>
                        <p>${recibido[i]["contenido"]}</p>
                </div>`;
      }
      enviados_div.innerHTML = salida;
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };
  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(`{"id_usuario":${id_usuario}}`);
}

// Cargo y pinto en el select todos los usuarios registrados
function cargarDestinos() {
  let recibido = "";
  let srcOperacion = src + "recogeUsuarios";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Ejercicios cargados");
      recibido = JSON.parse(xhr.responseText);
      salida = `<option value="${recibido[0]["id_usuario"]}" selected>${recibido[0]["nombre_usuario"]}</option>`;
      for (let i = 1; i < recibido.length; i++) {
        salida += `<option value="${recibido[i]["id_usuario"]}">${recibido[i]["nombre_usuario"]}</option>`;
      }
      destinatario.innerHTML = salida;
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };
  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send();
}

// Envio el mensaje
function enviarMensaje(event) {
  event.preventDefault();

  let procedencia = id_usuario;
  let destino = destinatario.value;
  let asunto = asunto_mensaje.value;
  let cuerpo = mensaje_contenido.value;

  const xhr = new XMLHttpRequest();

  let srcOperacion = src + "enviarMensaje";

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log(procedencia + destino + asunto + cuerpo);
      console.log(xhr.responseText);
      cargarEnviados();
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(
    `{"procede":${procedencia},"destino":${destino}, "asunto":"${asunto}", "cuerpo":"${cuerpo}"}`
  );
}

//-----ADMINISTRACION----

function cargarAdmin() {
  activo.style.display = "none";
  activo = admin_div;
  admin_div.style.display = "block";
  cargarUsuarios();
}

// Pintamos todos los usuarios registrados junto con un boton verde si son admin o rojo si no lo son, ademas de un boton para eliminar el usuario
function cargarUsuarios() {
  let recibido = "";
  let salida = "";
  lista_usuarios.innerHTML = salida;

  let srcOperacion = src + "recogeUsuarios";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Usuarios cargados");
      recibido = JSON.parse(xhr.responseText);
      for (let i = 0; i < recibido.length; i++) {
        salida += `
                <div class="tarjeta_usuario">
                <img src="${recibido[i]["foto_perfil"]}" alt="Foto de ${recibido[i]["nombre_usuario"]}"><br>
                <label class="nombre">${recibido[i]["nombre_usuario"]}</label><br>
                <button type="button" `;
        if (recibido[i]["es_admin"] == 1) {
          salida += `style="background-color:green" `;
        } else {
          salida += `style="background-color:red" `;
        }
        salida += `value="${recibido[i]["id_usuario"]}" onClick="compruebaAdmin(this.value)">Admin</button>
                <button type="button" value="${recibido[i]["id_usuario"]}"  class="cancelar" onClick="eliminarUsuario(this.value)">Elimniar usuario</button>
                </div>`;
      }

      lista_usuarios.innerHTML = salida;
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };
  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send();
}

// Si no es admin le damos el rol
function darAdmin(id) {
  let srcOperacion = src + "darAdmin";
  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Rol asignado");
      cargarAdmin();
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(`{"id_usuario":${id}}`);
}

// Si es admin se lo quitamos
function quitarAdmin(id) {
  let srcOperacion = src + "quitarAdmin";
  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Rol revocado");
      cargarAdmin();
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(`{"id_usuario":${id}}`);
}

// Mediante el id del usuario almacenado en el value del boton comprobamos si es admin o no
function compruebaAdmin(id) {
  let recibido = "";
  let srcOperacion = src + "compruebaAdmin";
  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      recibido = JSON.parse(xhr.responseText);
      if (recibido[0]["es_admin"] != 1) {
        console.log("Le doy admin");
        darAdmin(id);
      } else {
        console.log("Le quito admin");
        quitarAdmin(id);
      }
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(`{"id_usuario":${id}}`);
}

// Eliminamos el usuario a traves de su id_usuario
function eliminarUsuario(id) {
  let srcOperacion = src + "borrarUser";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log("Usuario eliminado");
      cargarAdmin();
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  xhr.send(`{"id_usuario":${id}}`);
}

//---LOGIN----
// Formulario de login que devuelve el id de usuario
function Logearse(event) {
  event.preventDefault();

  const usuario = document.getElementById("user_login").value;
  const contrasena = document.getElementById("pass_login").value;
  let recibido = "";

  const xhr = new XMLHttpRequest();

  let srcOperacion = src + "login";

  xhr.open("POST", srcOperacion, true); // Hacemos la petición por POST
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      //la solicitud ha sido exitosa
      console.log("Inicio de sesión correcto");
      recibido = JSON.parse(xhr.responseText);
      almacenarSesion(
        recibido[0]["id_usuario"],
        recibido[0]["nombre_usuario"],
        recibido[0]["contrasena"],
        recibido[0]["foto_perfil"],
        recibido[0]["es_admin"]
      );
      sesionIniciada();
    } else {
      alert("Datos incorrectos");
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };
  //Envio
  xhr.send(`{"nombre":"${usuario}", "contrasena":"${contrasena}"}`);
}

// Almaceno todos los datos de la sesion en sessionStorage
function almacenarSesion(id, nombre, pass, foto, esadmin) {
  sessionStorage.clear();
  // Almaceno que se ha logeado
  sessionStorage.setItem("logeado", true);
  logeado = sessionStorage.getItem("logeado");
  // Almaceno la sesion de usuario
  sessionStorage.setItem("id_usuario", id);
  id_usuario = sessionStorage.getItem("id_usuario");
  // Almaceno también el nombre
  sessionStorage.setItem("nombre_usuario", nombre);
  nombre_usuario = sessionStorage.getItem("nombre_usuario");
  //Almaceno la contraseñá
  sessionStorage.setItem("pass", pass);
  contrasena_usuario = sessionStorage.getItem("pass");
  // Almaceno la ruta de la foto de perfil
  sessionStorage.setItem("foto_perfil", foto);
  foto_perfil = sessionStorage.getItem("foto_perfil");
  //Almaceno si es admin
  console.log(esadmin);
  if (esadmin == 1) {
    sessionStorage.setItem("admin", true);
  } else {
    sessionStorage.setItem("admin", false);
  }
  admin = sessionStorage.getItem("admin");
}

// Recopilo todos los datos de la sesion en sessionStorage
function recopilarSesion() {
  logeado = sessionStorage.getItem("logeado");
  id_usuario = sessionStorage.getItem("id_usuario");
  nombre_usuario = sessionStorage.getItem("nombre_usuario");
  admin = sessionStorage.getItem("admin");
  foto_perfil = sessionStorage.getItem("foto_perfil");
  contrasena_usuario = sessionStorage.getItem("pass");
}

// Comprobamos si es admin
function esAdmin() {
  console.log("Comprobando si es admin");
  console.log(admin);
  // Almacenamos si es admin en otra sesion
  if (admin) {
    admin_boton.style.display = "block";
  } else {
    admin_boton.style.display = "none";
  }
}

//---REGISTRO----

// Formulario de registro
function Registrarse(event) {
  event.preventDefault();

  const usuario = document.getElementById("user_registro").value;
  const contrasena = document.getElementById("pass_registro").value;

  let xhr = new XMLHttpRequest();
  let srcOperacion = src + "registro";

  xhr.open("POST", srcOperacion, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Definir la función de respuesta
  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      //Compruebo que el usuario no existe
      if (xhr.responseText.includes("Duplicate")) {
        alert("Ese nombre de usuario ya está en uso");
      } else {
        //la solicitud ha sido exitosa
        alert("Registro correcto");
        location.reload();
      }
    } else {
      // Ha habido un error
      console.log("Error: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };

  xhr.send(`{"nombre":"${usuario}", "contrasena":"${contrasena}"}`);
}

// Comprobamos que las contraseñas coincidan
function compruebaContrasena() {
  let contrasena_primera = document.getElementById("pass_registro").value;
  let contrasena_confirmar = document.getElementById(
    "contrasena_confirmar"
  ).value;
  if (contrasena_confirmar != contrasena_primera) {
    document.getElementById("contrasena_confirmar").style.background = "red";
    return false;
  } else {
    document.getElementById("contrasena_confirmar").style.background = "white";
    return true;
  }
}

//------DESCONECTAR-----
function desconectar() {
  sessionStorage.clear();
  id_usuario = null;
  admin = false;
  logeado = false;
  location.reload();
}

// ----------------LISTENERS------------

//COMPRUEBO SI AL CARGAR LA PAGINA ESTÁ LA SESION INICIADA
document.addEventListener("DOMContentLoaded", function () {
  recopilarSesion();
  if (logeado) {
    sesionIniciada();
  } else {
    loginDiv.style.display = "block";
    login_boton.style.display = "none";
  }
});

//------MENSAJES-------
// Muestro los recibidos
recibidos_boton.addEventListener("click", function () {
  cargarRecibidos();
});
// Muestro los enviados
enviados_boton.addEventListener("click", function () {
  cargarEnviados();
});
// Envio el mensaje
mensaje_form.addEventListener("submit", function (event) {
  enviarMensaje(event);
  mensaje_field.style.display = "none";
});
// Muestro el formulario de enviar mensaje
nuevo_mensaje.addEventListener("click", function () {
  mensaje_field.style.display = "block";
});
// Oculto el formulario de enviar mensaje
cancelar_mensaje.addEventListener("click", function () {
  mensaje_field.style.display = "none";
});

//-------PERFIL----------
// Muestro el formulario de editar perfil
editar_perfil.addEventListener("click", function () {
  editar_field.style.display = "block";
  editar_perfil.style.display = "none";
});

//Oculto el formulario de editar perfil
cancelar_editar.addEventListener("click", function () {
  editar_field.style.display = "none";
  editar_perfil.style.display = "block";
});

// Envio el formulario
form_edit_perfil.addEventListener("submit", function (event) {
  editarPerfil(event);
  editar_field.style.display = "none";
});
//---NUEVA PUBLICACION--
//Mostramos el formulario de publicacion nueva
publi_boton.addEventListener("click", function () {
  publi_field.style.display = "block";
  publi_boton.style.display = "none";
  pintaEjercicios();
});
//Ocultamos el formulario de publicacion nueva
publi_cancel.addEventListener("click", function () {
  publi_field.style.display = "none";
  publi_boton.style.display = "block";
});
//--FORMULARIO---
publi_form.addEventListener(
  "submit",
  function (event) {
    publi_field.style.display = "none";
    publi_boton.style.display = "block";
    nuevaPubli(
      event,
      nueva_peso.value,
      nueva_repe.value,
      lista_ejercicios.value
    );
  },
  true
);

// ------------LOGIN---------
// Mostramos el login al pulsar su boton
document.getElementById("login_boton").addEventListener("click", function () {
  loginDiv.style.display = "block";
  login_boton.style.display = "none";
});
// Ocultamos el login al pulsar cancelar
document
  .getElementById("cancelar_login")
  .addEventListener("click", function () {
    loginDiv.style.display = "none";
    login_boton.style.display = "block";
  });

// Llamamos a la funcion Logearse
loginForm.addEventListener(
  "submit",
  function (event) {
    Logearse(event);
  },
  true
);

// ------------- REGISTRO------------
// Mostramos el registro al pulsar el boton además de ocultar el login
document
  .getElementById("no_registro_boton")
  .addEventListener("click", function () {
    loginDiv.style.display = "none";
    registroDiv.style.display = "block";
  });
// Ocultamos el registro y volvemos a mostrar el login
document
  .getElementById("cancelar_registro")
  .addEventListener("click", function () {
    registroDiv.style.display = "none";
    loginDiv.style.display = "block";
  });
//Envio el formulario de registro
registroForm.addEventListener(
  "submit",
  function (event) {
    if (compruebaContrasena()) {
      console.log("Las contraseñas coinciden");
      Registrarse(event);
    } else {
      alert("Las contraseñas no coinciden");
    }
  },
  true
);