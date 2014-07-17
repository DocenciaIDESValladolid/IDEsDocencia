CREATE TABLE municipios (
  id_municipio int NOT NULL,
  nombre varchar(100),
  codigoine smallint(8),
  jurisdicci varchar(100),
  provincia smallint(5),
  PRIMARY KEY (id_municipio, codigoine, provincia)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE emails (
	id_municipio int,
	email varchar(60),
	PRIMARY KEY (id_municipio)
);