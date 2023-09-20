<?php

    class Usuarios extends Conectar{
        // Comprobamos que nombre de usuario y contrasena coinciden
        public function login($usuario, $contrasena) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT * FROM usuarios WHERE nombre_usuario= ? and
             contrasena= ?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $usuario);
            $sql->bindValue(2, $contrasena);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
        //Insertamos los datos en la base de datos
        public function registro($usuario, $contrasena) {
            $imgPerfil = "http://localhost/gymbook/img/default.png";
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "INSERT INTO usuarios(id_usuario, nombre_usuario,
             contrasena, foto_perfil) VALUES (NULL, ?, ?, ?)";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $usuario);
            $sql->bindValue(2, $contrasena);
            $sql->bindValue(3, $imgPerfil);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        // Muestra todos los usuarios
        public function recogeUsuarios() {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT * FROM usuarios";
            $sql = $conectar->prepare($sql);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
        // Recoge la ruta de la img de perfil
        public function rutaFoto($usuario) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT foto_perfil FROM usuarios WHERE nombre_usuario=?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $usuario);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
        // Modifica los datos de usuario
        public function editarPerfil($id, $nombre, $contrasena) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "UPDATE usuarios SET nombre_usuario=?, contrasena=? WHERE id_usuario=?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $nombre);
            $sql->bindValue(2, $contrasena);
            $sql->bindValue(3, $id);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        //Comprobamos si es admin
        function compruebaAdmin($id) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT es_admin from usuarios WHERE id_usuario=?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1,$id);
            $sql->execute();;
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
        // Asignamos el rol de admin
        function darAdmin($id) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "UPDATE usuarios SET es_admin=1 WHERE id_usuario=?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        //Revocamos el rol de admmin
        function quitarAdmin($id) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "UPDATE usuarios SET es_admin=0 WHERE id_usuario=?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        // Eliminamos el usuario
        function borrarUser($id) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "DELETE FROM usuarios WHERE id_usuario=?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    class Publicaciones extends Conectar{
        //Recojo todos los ejercicios
        public function ejercicios() {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT * FROM ejercicios";
            $sql = $conectar->prepare($sql);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        //Creo una nueva publicacion
        public function nuevaPubli($id_usuario, $peso, $repes, $id_ejercicio) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "INSERT INTO publicaciones (id_usuario, peso, id_ejercicio, repeticiones)
             VALUES (?, ?, ?, ?)";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id_usuario);
            $sql->bindValue(2, $peso);
            $sql->bindValue(3, $id_ejercicio);
            $sql->bindValue(4, $repes);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function eliminarPubli($id) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "DELETE FROM publicaciones WHERE id_publicacion=?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        //Recojo el listado de publicaciones
        public function listaPubli() {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT publicaciones.id_publicacion, publicaciones.peso,
            publicaciones.repeticiones,foto_perfil,usuarios.foto_perfil as foto_perfil, usuarios.nombre_usuario AS usuario,
            ejercicios.nombre_ejercicio AS nombre_ejercicio FROM publicaciones
            JOIN usuarios ON
            publicaciones.id_usuario = usuarios.id_usuario
            JOIN ejercicios ON
            publicaciones.id_ejercicio = ejercicios.id_ejercicio
            ORDER BY publicaciones.id_publicacion DESC";
            $sql = $conectar->prepare($sql);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function misPubli($id_usuario) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT publicaciones.id_publicacion, publicaciones.peso,
            publicaciones.repeticiones, foto_perfil,usuarios.foto_perfil as foto_perfil, usuarios.nombre_usuario AS usuario,
            ejercicios.nombre_ejercicio AS nombre_ejercicio FROM publicaciones
            JOIN ejercicios ON
            publicaciones.id_ejercicio = ejercicios.id_ejercicio
            JOIN usuarios ON
            publicaciones.id_usuario = usuarios.id_usuario            
            WHERE publicaciones.id_usuario =?
            ORDER BY publicaciones.id_publicacion DESC";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id_usuario);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    class Mensajes extends Conectar{
        // Envio el mensaje a la base de datos
        public function enviarMensaje($procede, $destino, $asunto, $cuerpo) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "INSERT INTO mensajes_privados (id_mensaje, id_usuario_envia, id_usuario_recibe, contenido, asunto)
             VALUES (NULL, ?, ?, ?, ?)";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $procede);
            $sql->bindValue(2, $destino);
            $sql->bindValue(3, $cuerpo);
            $sql->bindValue(4, $asunto);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        // Recojo todos los mensajes cuyo id_recibe coinciden con el del usuario logeado
        public function cargarRecibidos($id_usuario) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT mensajes_privados.id_mensaje, mensajes_privados.asunto, mensajes_privados.contenido,
            usuarios.nombre_usuario as nombre_usuario FROM mensajes_privados
            JOIN usuarios ON
            mensajes_privados.id_usuario_envia = usuarios.id_usuario
            WHERE mensajes_privados.id_usuario_recibe = ?
            ORDER BY mensajes_privados.id_mensaje DESC";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id_usuario);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        // Recojo todos los mensajes cuyo id_envia coinciden con el del usuario logeado
        public function cargarEnviados($id_usuario) {
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT mensajes_privados.id_mensaje, mensajes_privados.asunto, mensajes_privados.contenido,
            usuarios.nombre_usuario as nombre_usuario FROM mensajes_privados
            JOIN usuarios ON
            mensajes_privados.id_usuario_recibe = usuarios.id_usuario
            WHERE mensajes_privados.id_usuario_envia = ?
            ORDER BY mensajes_privados.id_mensaje DESC";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $id_usuario);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>