/* Tablas que almacenan la información necesaria de las denuncias. */
/* Secuencias usadas en PostgreSQL*/

/* Tablas que almacenan la información necesaria de las denuncias. */


CREATE TABLE denuncias (
  id_denuncia SERIAL,
  texto varchar(100) NOT NULL DEFAULT '',
  the_geom geometry, --con PostgreSQL si que deja el tipo geometry, en sql no lo permite, hay que usar point
  fecha date,				-- Fecha en la que se añadió la denuncia
  PRIMARY KEY (id_denuncia)
);

	/* 
		CODIFICACIÓN DE LOS ESTADOS:
	
		estado_ayto
		- 0: Denunciado, no solucionado, falta confirmación.
		- 1: Solucionado.
		- 2: Falsa denuncia


		estado_usuario
		- 0: Denunciado, no solucionado, falta confirmación.
		- 1: Solucionado.
		- 2: Falso positivo.				
		
	*/
	
CREATE TABLE estado_ayto (
	id_denuncia int,
	id_usuario int,
	fecha date,		-- Fecha de la última modificación del estado
	estado int);

	
CREATE TABLE estado_usuario(
	id_denuncia int,
	id_usuario int,
	fecha date,		-- Fecha de la última modificación del estado
	estado int);

	
CREATE TABLE denunciantes(
	id_denuncia int,
	id_denunciante int,
	fecha date);		-- Fecha en la que se añadió el denunciante a la denuncia






/* Diseño anterior */
CREATE TABLE denuncias (
  id_denuncia int NOT NULL AUTO_INCREMENT,
  texto varchar(100) NOT NULL DEFAULT '',
  localizacion geometry,
  fecha date,				-- Fecha en la que se añadió la denuncia
  PRIMARY KEY (id_denuncia)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


	/* 
		CODIFICACIÓN DE LOS ESTADOS:
	
		estado_ayto
		- 0: Denunciado, no solucionado, falta confirmación.
		- 1: Solucionado.
		- 2: Falsa denuncia


		estado_usuario
		- 0: Denunciado, no solucionado, falta confirmación.
		- 1: Solucionado.
		- 2: Falso positivo.				
		
	*/
	
CREATE TABLE estado_ayto (
	id_denuncia int,
	id_usuario int,
	fecha date,		-- Fecha de la última modificación del estado
	estado int);

	
CREATE TABLE estado_usuario(
	id_denuncia int,
	id_usuario int,
	fecha date,		-- Fecha de la última modificación del estado
	estado int);

	
CREATE TABLE denunciantes(
	id_denuncia int,
	id_denunciante int,
	fecha date);		-- Fecha en la que se añadió el denunciante a la denuncia

