<?php

    header("Content-Type: application/json");

    require_once("dbcon.php");
    require_once("funciones.php");

    $usuario = new Usuarios();
    $publicaciones = new Publicaciones();
    $mensajes = new Mensajes();

    //Recibo los valores enviados desde el cliente
	$body = json_decode(file_get_contents("php://input"), true);
    
    switch($_GET["op"]) {
        case "login":
            $datos = $usuario->login($body["nombre"], $body["contrasena"]);
            echo json_encode($datos);
            break;
        case "registro":
            $datos = $usuario->registro($body["nombre"], $body["contrasena"]);
            echo json_encode($datos);
            break;
        case "recogeUsuarios":
            $datos = $usuario->recogeUsuarios();
            echo json_encode($datos);
            break;
        case "pedirFoto":
            $datos = $usuario->rutaFoto($body["usuario"]);
            echo json_encode($datos);
            break;
        case "editarPerfil":
            $datos = $usuario->editarPerfil($body["id_usuario"], $body["nombre_usuario"], $body["contrasena"]);
            echo "Modificacion correcta";
            break;
        case "compruebaAdmin":
            $datos = $usuario->compruebaAdmin($body["id_usuario"]);
            echo json_encode($datos);
            break;
        case "darAdmin":
            $datos = $usuario->darAdmin($body["id_usuario"]);
            echo "Rol asignado";
            break;
        case "quitarAdmin":
            $datos = $usuario->quitarAdmin($body["id_usuario"]);
            break;
        case "borrarUser":
            $datos = $usuario->borrarUser($body["id_usuario"]);
            break;
        case "ejercicios":
            $datos = $publicaciones->ejercicios();
            echo json_encode($datos);
            break;
        case "nuevaPubli":
            $datos = $publicaciones->nuevaPubli($body["usuario"], $body["peso"], $body["repes"], $body["ejercicio"]);
            echo json_encode($datos);
            break;
        case "eliminarPubli":
            $datos = $publicaciones->eliminarPubli($body["id_publicacion"]);
            echo "publicación eliminada";
            break;
        case "listaPubli":
            $datos = $publicaciones->listaPubli();
            echo json_encode($datos);
            break;
        case "misPubli":
            $datos = $publicaciones->misPubli($body["id_usuario"]);
            echo json_encode($datos);
            break; 
        case "enviarMensaje":
            $datos = $mensajes->enviarMensaje($body["procede"], $body["destino"], $body["asunto"], $body["cuerpo"]);
            echo json_encode($datos);
            break;
        case "cargarRecibidos":
            $datos = $mensajes->cargarRecibidos($body["id_usuario"]);
            echo json_encode($datos);
            break;
        case "cargarEnviados":
            $datos = $mensajes->cargarEnviados($body["id_usuario"]);
            echo json_encode($datos);
            break;
        default:
            echo "Hola soy el default";
    }
?>