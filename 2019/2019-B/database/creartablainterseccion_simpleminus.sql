--Solo con las variables que nos dan datos interesantes para mostrar en la salida
CREATE TABLE interseccion(
   id  SERIAL PRIMARY KEY,
   name char(50),
   --Aeropuertos 
   tip_area int,
   tip_aread char(60),
   nombre char(200),
   --Aves
   site_name char(100),
   ac char(150),
   --Parques
   sitename char(254),
   figura_lp char(100),
   ccaa_n_enp char(254),
   --
   geom geometry(MULTILINESTRING,3857)
   
);