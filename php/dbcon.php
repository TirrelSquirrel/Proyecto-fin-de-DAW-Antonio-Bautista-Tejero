<?php
    // Creando la clase Conectar

    class Conectar {
        function Conexion() {
            $conectar = $this->dbh = new PDO("mysql:local=localhost; dbname=gymbook",
                                            "root",
                                            "");
            return $conectar;
        }

        function set_names() {
            return $this->dbh->query("SET NAMES 'utf8'");
        }
    }

?>