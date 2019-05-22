CREATE TABLE interseccion(
   id  SERIAL PRIMARY KEY,
   name char(50),
   --Aeropuertos 
   id_aerodro double precision,
   id_area double precision,
   tip_area int,
   tip_aread char(60),
   desigandor char(20),
   nombre char(200),
   longitud int,
   longitudd char(20),
   anchura int,
   anchurad char(20),
   comp_sup int,
   comp_supd char(20),
   tip_pista int,
   tip_pistad char(20),
   fuente int,
   fuented char(40),
   fecha_alta date,
   --Aves
   site_code char(20),
   site_name char(100),
   ac char(150),
   hectareas int,
   shape_leng int,
   shape_area int,
   --Parques
   sitecode char(20),
   sitename char(254),
   figura_lp char(100),
   area_ha int,
   year_a char(4),
   ccaa int,
   enp_fgral int,
   ccaa_n_enp char(254),
   shape_len int,
   layer char(100),
   path_a char(254),
   --
   geom geometry(MULTILINESTRING,3857)
   
);