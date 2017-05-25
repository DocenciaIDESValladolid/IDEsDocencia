CREATE TABLE public.incendios
(
  ine character(5),
  total integer
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.incendios
  OWNER TO postgres;
  
-- Importamos desde los menús el cvs obtenido del excel y con las columnas truncadas.

-- Para los municipios importamos el shp, con sistema de referencia ETRS89 UTM 30

-- Modificamos el sistema de referencia de la geometria

alter table provincias add column geom geometry(MultiPolygon,4258);

update provincias set geom = ST_Transform(the_geom, 4258); 

alter table provincias drop column the_geom;

alter table provincias rename column geom to the_geom

--Combinamos en Geoserver ambas tablas para mostrarlas de forma conjunta.

select gid,ine,texto,total,geom from municipios left join incendios on (municipios.codigo = incendios.ine)
