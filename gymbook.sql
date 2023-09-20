-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-03-2023 a las 17:06:28
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gymbook`
-- Ceo la base de datos
  CREATE DATABASE gymbook;
  USE gymbook;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id_ejercicio` int(10) UNSIGNED NOT NULL,
  `nombre_ejercicio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id_ejercicio`, `nombre_ejercicio`) VALUES
(1, 'deadlift'),
(2, 'bench press'),
(3, 'back squat'),
(4, 'strict press'),
(5, 'push press'),
(6, 'front squat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_privados`
--

CREATE TABLE `mensajes_privados` (
  `id_mensaje` int(10) UNSIGNED NOT NULL,
  `id_usuario_envia` int(10) UNSIGNED NOT NULL,
  `id_usuario_recibe` int(10) UNSIGNED NOT NULL,
  `contenido` varchar(1000) NOT NULL,
  `asunto` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensajes_privados`
--

INSERT INTO `mensajes_privados` (`id_mensaje`, `id_usuario_envia`, `id_usuario_recibe`, `contenido`, `asunto`) VALUES
(1, 1, 2, 'Hola como vas', 'asunto test'),
(2, 1, 2, 'ad', 'ad'),
(3, 2, 1, 'albion online es un mmorpg no lineal en el que escribes tu propia historia sin limitarte a seguir un camino prefijado, explora un amplio mundo abierto con cinco biomas unicos, todo cuanto hagas tendra su repercusíon en el mundo, con su economia orientada al jugador de albion los jugadores crean practicamente todo el equipo a partir de los recursos que consiguen, el equipo que llevas define quien eres, cambia de arma y armadura para pasar de caballero a mago o juego como una mezcla de ambas clases, aventurate en el mundo abierto y haz frente a los habitantes y las criaturas de albion, inicia expediciones o adentrate en mazmorras en las que encontraras enemigos aun mas dificiles, enfrentate a otros jugadores en encuentros en el mundo abierto, lucha por los territorios o por ciudades enteras en batallas tacticas, relajate en tu isla privada donde podras construir un hogar, cultivar cosechas, criar animales, unete a un gremio, todo es mejor cuando se trabaja en grupo [musica] adentrate ya ', 'Hola'),
(4, 1, 4, 'ads', 'ads'),
(6, 1, 3, 'ads', 'ads');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `peso` int(10) UNSIGNED NOT NULL,
  `id_ejercicio` int(10) UNSIGNED NOT NULL,
  `repeticiones` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `id_usuario`, `peso`, `id_ejercicio`, `repeticiones`) VALUES
(2, 1, 200, 1, 3),
(3, 1, 135, 2, 1),
(4, 3, 100, 1, 1),
(5, 1, 165, 3, 1),
(6, 2, 100, 2, 1),
(7, 4, 100, 2, 1),
(8, 1, 85, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `foto_perfil` varchar(255) NOT NULL,
  `es_admin` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `contrasena`, `foto_perfil`, `es_admin`) VALUES
(1, 'admin', 'admin', 'http://localhost/gymbook/img/baute.png', 1),
(2, 'andres', 'ludus', 'http://localhost/gymbook/img/elmo.png', 0),
(3, 'megan', 'brandy', 'http://localhost/gymbook/img/brandy.png', 0),
(4, 'pipa', 'rust', 'http://localhost/gymbook/img/tanjiro.png', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id_ejercicio`);

--
-- Indices de la tabla `mensajes_privados`
--
ALTER TABLE `mensajes_privados`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `mensajes_privados_ibfk_1` (`id_usuario_envia`),
  ADD KEY `mensajes_privados_ibfk_2` (`id_usuario_recibe`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `publicaciones_ibfk_1` (`id_usuario`),
  ADD KEY `publicaciones_ibfk_2` (`id_ejercicio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id_ejercicio` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `mensajes_privados`
--
ALTER TABLE `mensajes_privados`
  MODIFY `id_mensaje` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mensajes_privados`
--
ALTER TABLE `mensajes_privados`
  ADD CONSTRAINT `mensajes_privados_ibfk_1` FOREIGN KEY (`id_usuario_envia`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensajes_privados_ibfk_2` FOREIGN KEY (`id_usuario_recibe`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `publicaciones_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicios` (`id_ejercicio`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
