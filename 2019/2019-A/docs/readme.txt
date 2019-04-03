Ejemplo de scropt para importar a una tabla:

Primero crear la tabla con los campos que interesen (campo geom de tipo punto):

CREATE TABLE precarga
(
  id serial NOT NULL,
  "AddressInfo/Latitude" numeric(12,3),
  "AddressInfo/Longitude" numeric(12,3),
  geom geometry(POINT,4326)
  )

COPY precarga("AddressInfo/Latitude","AddressInfo/Longitude") 
FROM 'C:\tmp\puntosderecarga.csv' DELIMITER ',' CSV HEADER;


Ahora crea las geometrías a partir de los puntos:

UPDATE precarga SET geom = ST_SetSRID(ST_MakePoint("AddressInfo/Longitude", "AddressInfo/Latitude"),4326);
