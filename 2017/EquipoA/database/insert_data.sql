CREATE TABLE public.zonas
(
  sitecode character varying(30), -- Identificador de la zona natural
  nombre character varying(254), -- Nombre de la zona natural
  area_ha character varying(20), -- Area en heptareas de la zona natural
  geom geometry -- Geometria de la zona
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.zonas
  OWNER TO postgres;
COMMENT ON TABLE public.zonas
  IS 'Cojunto de todas las zonas naturales clasificadas';
COMMENT ON COLUMN public.zonas.sitecode IS 'Identificador de la zona natural';
COMMENT ON COLUMN public.zonas.nombre IS 'Nombre de la zona natural';
COMMENT ON COLUMN public.zonas.area_ha IS 'Area en heptareas de la zona natural';
COMMENT ON COLUMN public.zonas.geom IS 'Geometria de la zona';


INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.monumentos_naturales_canarias;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.monumentos_naturales_esp;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.otros_esp;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.paisajes_protegidos_canarias;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.paisajes_protegidos_esp;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.parques_nacionales_canarias;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.parques_nacionales_esp;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.parques_naturales_canarias;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.parques_naturales_esp;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.reservas_naturales_canarias;

INSERT INTO public.zonas (sitecode, nombre, area_ha, geom )
SELECT sitecode, nombre, area_ha, ST_Simplify(ST_Transform(geom, 4258),5000/40000*360,false) FROM public.reservas_naturales_esp;

