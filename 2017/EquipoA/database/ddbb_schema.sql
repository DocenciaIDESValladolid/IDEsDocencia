--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

-- Started on 2017-05-30 12:05:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3587 (class 1262 OID 31059)
-- Dependencies: 3586
-- Name: parques_naturales; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE parques_naturales IS 'Base de datos con toda la información preprocesada de los parques naturales';


--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 2 (class 3079 OID 31060)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 224 (class 1259 OID 47711)
-- Name: distancias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE distancias (
    gid integer NOT NULL,
    distancia integer,
    geom geometry(MultiPolygon,4258)
);


ALTER TABLE distancias OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 47709)
-- Name: distancias_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE distancias_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE distancias_gid_seq OWNER TO postgres;

--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 223
-- Name: distancias_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE distancias_gid_seq OWNED BY distancias.gid;


--
-- TOC entry 227 (class 1259 OID 48738)
-- Name: distancias_zonas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE distancias_zonas (
    gid integer NOT NULL,
    geom geometry(MultiPolygon,4258),
    distancia bigint
);


ALTER TABLE distancias_zonas OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 48744)
-- Name: distancias_zonas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE distancias_zonas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE distancias_zonas_id_seq OWNER TO postgres;

--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 228
-- Name: distancias_zonas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE distancias_zonas_id_seq OWNED BY distancias_zonas.gid;


--
-- TOC entry 219 (class 1259 OID 40744)
-- Name: incendios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE incendios (
    ine character(5),
    total integer
);


ALTER TABLE incendios OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 39460)
-- Name: monumentos_naturales_canarias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE monumentos_naturales_canarias (
    gid integer NOT NULL,
    sitecode character varying(10),
    area_ha character varying(13),
    year character varying(13),
    site_code double precision,
    enp_id double precision,
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut double precision,
    islas character varying(254),
    uicn character varying(254),
    geom geometry(MultiPolygon,32628)
);


ALTER TABLE monumentos_naturales_canarias OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 39458)
-- Name: monumentos_naturales_canrarias_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE monumentos_naturales_canrarias_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE monumentos_naturales_canrarias_gid_seq OWNER TO postgres;

--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 217
-- Name: monumentos_naturales_canrarias_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE monumentos_naturales_canrarias_gid_seq OWNED BY monumentos_naturales_canarias.gid;


--
-- TOC entry 204 (class 1259 OID 38804)
-- Name: monumentos_naturales_esp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE monumentos_naturales_esp (
    gid integer NOT NULL,
    sitecode character varying(20),
    site_desig character varying(4),
    site_name character varying(254),
    figura_lp character varying(100),
    area_ha character varying(13),
    year character varying(4),
    ccaa smallint,
    enp_id character varying(254),
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut character varying(254),
    geom geometry(MultiPolygon,3042)
);


ALTER TABLE monumentos_naturales_esp OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 38802)
-- Name: monumentos_naturales_esp_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE monumentos_naturales_esp_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE monumentos_naturales_esp_gid_seq OWNER TO postgres;

--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 203
-- Name: monumentos_naturales_esp_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE monumentos_naturales_esp_gid_seq OWNED BY monumentos_naturales_esp.gid;


--
-- TOC entry 221 (class 1259 OID 40809)
-- Name: municipios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE municipios (
    gid integer NOT NULL,
    codigo character varying(5),
    texto character varying(254),
    cod_prov character varying(2),
    provincia character varying(50),
    cod_ccaa character varying(2),
    comautonom character varying(50),
    geom geometry(MultiPolygon,4258)
);


ALTER TABLE municipios OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 40807)
-- Name: municipios_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE municipios_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE municipios_gid_seq OWNER TO postgres;

--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 220
-- Name: municipios_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE municipios_gid_seq OWNED BY municipios.gid;


--
-- TOC entry 208 (class 1259 OID 38974)
-- Name: otros_esp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE otros_esp (
    gid integer NOT NULL,
    sitecode character varying(20),
    site_desig character varying(4),
    site_name character varying(254),
    figura_lp character varying(100),
    area_ha character varying(13),
    year character varying(4),
    ccaa smallint,
    enp_id character varying(254),
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut character varying(254),
    geom geometry(MultiPolygon,3042)
);


ALTER TABLE otros_esp OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 38972)
-- Name: otros_esp_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE otros_esp_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE otros_esp_gid_seq OWNER TO postgres;

--
-- TOC entry 3597 (class 0 OID 0)
-- Dependencies: 207
-- Name: otros_esp_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE otros_esp_gid_seq OWNED BY otros_esp.gid;


--
-- TOC entry 216 (class 1259 OID 39418)
-- Name: paisajes_protegidos_canarias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE paisajes_protegidos_canarias (
    gid integer NOT NULL,
    sitecode character varying(10),
    d_scheme character varying(12),
    site_desig character varying(11),
    area_ha character varying(13),
    year character varying(13),
    site_code double precision,
    enp_id double precision,
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut double precision,
    islas character varying(254),
    uicn character varying(254),
    geom geometry(MultiPolygon,32628)
);


ALTER TABLE paisajes_protegidos_canarias OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 39416)
-- Name: paisajes_protegidos_canarias_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE paisajes_protegidos_canarias_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE paisajes_protegidos_canarias_gid_seq OWNER TO postgres;

--
-- TOC entry 3598 (class 0 OID 0)
-- Dependencies: 215
-- Name: paisajes_protegidos_canarias_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE paisajes_protegidos_canarias_gid_seq OWNED BY paisajes_protegidos_canarias.gid;


--
-- TOC entry 206 (class 1259 OID 38920)
-- Name: paisajes_protegidos_esp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE paisajes_protegidos_esp (
    gid integer NOT NULL,
    sitecode character varying(20),
    site_desig character varying(4),
    site_name character varying(254),
    figura_lp character varying(100),
    area_ha character varying(13),
    year character varying(4),
    ccaa smallint,
    enp_id character varying(254),
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut character varying(254),
    geom geometry(MultiPolygon,3042)
);


ALTER TABLE paisajes_protegidos_esp OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 38918)
-- Name: paisajes_protegidos_esp_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE paisajes_protegidos_esp_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE paisajes_protegidos_esp_gid_seq OWNER TO postgres;

--
-- TOC entry 3599 (class 0 OID 0)
-- Dependencies: 205
-- Name: paisajes_protegidos_esp_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE paisajes_protegidos_esp_gid_seq OWNED BY paisajes_protegidos_esp.gid;


--
-- TOC entry 214 (class 1259 OID 39402)
-- Name: parques_nacionales_canarias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE parques_nacionales_canarias (
    gid integer NOT NULL,
    sitecode character varying(10),
    area_ha character varying(13),
    year character varying(13),
    site_code double precision,
    enp_id double precision,
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut double precision,
    uicn character varying(254),
    geom geometry(MultiPolygon,32628)
);


ALTER TABLE parques_nacionales_canarias OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 39400)
-- Name: parques_nacionales_canarias_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE parques_nacionales_canarias_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE parques_nacionales_canarias_gid_seq OWNER TO postgres;

--
-- TOC entry 3600 (class 0 OID 0)
-- Dependencies: 213
-- Name: parques_nacionales_canarias_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE parques_nacionales_canarias_gid_seq OWNED BY parques_nacionales_canarias.gid;


--
-- TOC entry 198 (class 1259 OID 32436)
-- Name: parques_nacionales_esp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE parques_nacionales_esp (
    gid integer NOT NULL,
    sitecode character varying(20),
    site_desig character varying(4),
    site_name character varying(254),
    figura_lp character varying(100),
    area_ha character varying(13),
    year character varying(4),
    ccaa smallint,
    enp_id character varying(254),
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut character varying(254),
    geom geometry(MultiPolygon,3042)
);


ALTER TABLE parques_nacionales_esp OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 32434)
-- Name: parques_nacionales_esp_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE parques_nacionales_esp_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE parques_nacionales_esp_gid_seq OWNER TO postgres;

--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 197
-- Name: parques_nacionales_esp_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE parques_nacionales_esp_gid_seq OWNED BY parques_nacionales_esp.gid;


--
-- TOC entry 212 (class 1259 OID 39372)
-- Name: parques_naturales_canarias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE parques_naturales_canarias (
    gid integer NOT NULL,
    sitecode character varying(10),
    d_scheme character varying(12),
    area_ha character varying(13),
    year character varying(13),
    site_code double precision,
    enp_id double precision,
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut double precision,
    uicn character varying(254),
    geom geometry(MultiPolygon,32628)
);


ALTER TABLE parques_naturales_canarias OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 39370)
-- Name: parques_naturales_canarias_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE parques_naturales_canarias_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE parques_naturales_canarias_gid_seq OWNER TO postgres;

--
-- TOC entry 3602 (class 0 OID 0)
-- Dependencies: 211
-- Name: parques_naturales_canarias_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE parques_naturales_canarias_gid_seq OWNED BY parques_naturales_canarias.gid;


--
-- TOC entry 202 (class 1259 OID 38632)
-- Name: parques_naturales_esp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE parques_naturales_esp (
    gid integer NOT NULL,
    sitecode character varying(20),
    site_desig character varying(4),
    area_ha character varying(13),
    year character varying(4),
    ccaa smallint,
    enp_id character varying(254),
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    geom geometry(MultiPolygon,3042)
);


ALTER TABLE parques_naturales_esp OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 38630)
-- Name: parques_naturales_esp_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE parques_naturales_esp_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE parques_naturales_esp_gid_seq OWNER TO postgres;

--
-- TOC entry 3603 (class 0 OID 0)
-- Dependencies: 201
-- Name: parques_naturales_esp_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE parques_naturales_esp_gid_seq OWNED BY parques_naturales_esp.gid;


--
-- TOC entry 226 (class 1259 OID 48627)
-- Name: provincias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE provincias (
    gid integer NOT NULL,
    codigo character varying(2),
    texto character varying(22),
    texto_alt character varying(22),
    cod_ccaa character varying(2),
    ccaa character varying(26),
    the_geom geometry(MultiPolygon,4258)
);


ALTER TABLE provincias OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 48625)
-- Name: provincias_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE provincias_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE provincias_gid_seq OWNER TO postgres;

--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 225
-- Name: provincias_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE provincias_gid_seq OWNED BY provincias.gid;


--
-- TOC entry 210 (class 1259 OID 39312)
-- Name: reservas_naturales_canarias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reservas_naturales_canarias (
    gid integer NOT NULL,
    sitecode character varying(10),
    area_ha character varying(13),
    year character varying(13),
    site_code double precision,
    enp_id double precision,
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut double precision,
    uicn character varying(254),
    geom geometry(MultiPolygon,32628)
);


ALTER TABLE reservas_naturales_canarias OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 39310)
-- Name: reservas_naturales_canarias_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE reservas_naturales_canarias_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reservas_naturales_canarias_gid_seq OWNER TO postgres;

--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 209
-- Name: reservas_naturales_canarias_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE reservas_naturales_canarias_gid_seq OWNED BY reservas_naturales_canarias.gid;


--
-- TOC entry 200 (class 1259 OID 38254)
-- Name: reservas_naturales_esp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reservas_naturales_esp (
    gid integer NOT NULL,
    sitecode character varying(20),
    site_desig character varying(4),
    site_name character varying(254),
    figura_lp character varying(100),
    area_ha character varying(13),
    year character varying(4),
    ccaa smallint,
    enp_id character varying(254),
    nombre character varying(254),
    figura_cca character varying(254),
    figura_asi character varying(254),
    nut character varying(254),
    geom geometry(MultiPolygon,3042)
);


ALTER TABLE reservas_naturales_esp OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 38252)
-- Name: reservas_naturales_esp_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE reservas_naturales_esp_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reservas_naturales_esp_gid_seq OWNER TO postgres;

--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 199
-- Name: reservas_naturales_esp_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE reservas_naturales_esp_gid_seq OWNED BY reservas_naturales_esp.gid;


--
-- TOC entry 222 (class 1259 OID 41793)
-- Name: zonas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE zonas (
    sitecode character varying(30) NOT NULL,
    nombre character varying(254),
    area_ha character varying(20),
    geom geometry,
    tipo character(50)
);


ALTER TABLE zonas OWNER TO postgres;

--
-- TOC entry 3412 (class 2604 OID 48933)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY distancias ALTER COLUMN gid SET DEFAULT nextval('distancias_gid_seq'::regclass);


--
-- TOC entry 3414 (class 2604 OID 48934)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY distancias_zonas ALTER COLUMN gid SET DEFAULT nextval('distancias_zonas_id_seq'::regclass);


--
-- TOC entry 3410 (class 2604 OID 48935)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY monumentos_naturales_canarias ALTER COLUMN gid SET DEFAULT nextval('monumentos_naturales_canrarias_gid_seq'::regclass);


--
-- TOC entry 3403 (class 2604 OID 48936)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY monumentos_naturales_esp ALTER COLUMN gid SET DEFAULT nextval('monumentos_naturales_esp_gid_seq'::regclass);


--
-- TOC entry 3411 (class 2604 OID 48937)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY municipios ALTER COLUMN gid SET DEFAULT nextval('municipios_gid_seq'::regclass);


--
-- TOC entry 3405 (class 2604 OID 48938)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY otros_esp ALTER COLUMN gid SET DEFAULT nextval('otros_esp_gid_seq'::regclass);


--
-- TOC entry 3409 (class 2604 OID 48939)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY paisajes_protegidos_canarias ALTER COLUMN gid SET DEFAULT nextval('paisajes_protegidos_canarias_gid_seq'::regclass);


--
-- TOC entry 3404 (class 2604 OID 48940)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY paisajes_protegidos_esp ALTER COLUMN gid SET DEFAULT nextval('paisajes_protegidos_esp_gid_seq'::regclass);


--
-- TOC entry 3408 (class 2604 OID 48941)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_nacionales_canarias ALTER COLUMN gid SET DEFAULT nextval('parques_nacionales_canarias_gid_seq'::regclass);


--
-- TOC entry 3400 (class 2604 OID 48942)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_nacionales_esp ALTER COLUMN gid SET DEFAULT nextval('parques_nacionales_esp_gid_seq'::regclass);


--
-- TOC entry 3407 (class 2604 OID 48943)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_naturales_canarias ALTER COLUMN gid SET DEFAULT nextval('parques_naturales_canarias_gid_seq'::regclass);


--
-- TOC entry 3402 (class 2604 OID 48944)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_naturales_esp ALTER COLUMN gid SET DEFAULT nextval('parques_naturales_esp_gid_seq'::regclass);


--
-- TOC entry 3413 (class 2604 OID 48945)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY provincias ALTER COLUMN gid SET DEFAULT nextval('provincias_gid_seq'::regclass);


--
-- TOC entry 3406 (class 2604 OID 48946)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reservas_naturales_canarias ALTER COLUMN gid SET DEFAULT nextval('reservas_naturales_canarias_gid_seq'::regclass);


--
-- TOC entry 3401 (class 2604 OID 48947)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reservas_naturales_esp ALTER COLUMN gid SET DEFAULT nextval('reservas_naturales_esp_gid_seq'::regclass);


--
-- TOC entry 3456 (class 2606 OID 47716)
-- Name: distancias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY distancias
    ADD CONSTRAINT distancias_pkey PRIMARY KEY (gid);


--
-- TOC entry 3460 (class 2606 OID 48931)
-- Name: distancias_zonas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY distancias_zonas
    ADD CONSTRAINT distancias_zonas_pkey PRIMARY KEY (gid);


--
-- TOC entry 3447 (class 2606 OID 39468)
-- Name: monumentos_naturales_canrarias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY monumentos_naturales_canarias
    ADD CONSTRAINT monumentos_naturales_canrarias_pkey PRIMARY KEY (gid);


--
-- TOC entry 3426 (class 2606 OID 38812)
-- Name: monumentos_naturales_esp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY monumentos_naturales_esp
    ADD CONSTRAINT monumentos_naturales_esp_pkey PRIMARY KEY (gid);


--
-- TOC entry 3451 (class 2606 OID 40814)
-- Name: municipios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY municipios
    ADD CONSTRAINT municipios_pkey PRIMARY KEY (gid);


--
-- TOC entry 3432 (class 2606 OID 38982)
-- Name: otros_esp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY otros_esp
    ADD CONSTRAINT otros_esp_pkey PRIMARY KEY (gid);


--
-- TOC entry 3444 (class 2606 OID 39426)
-- Name: paisajes_protegidos_canarias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY paisajes_protegidos_canarias
    ADD CONSTRAINT paisajes_protegidos_canarias_pkey PRIMARY KEY (gid);


--
-- TOC entry 3429 (class 2606 OID 38928)
-- Name: paisajes_protegidos_esp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY paisajes_protegidos_esp
    ADD CONSTRAINT paisajes_protegidos_esp_pkey PRIMARY KEY (gid);


--
-- TOC entry 3441 (class 2606 OID 39410)
-- Name: parques_nacionales_canarias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_nacionales_canarias
    ADD CONSTRAINT parques_nacionales_canarias_pkey PRIMARY KEY (gid);


--
-- TOC entry 3417 (class 2606 OID 32444)
-- Name: parques_nacionales_esp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_nacionales_esp
    ADD CONSTRAINT parques_nacionales_esp_pkey PRIMARY KEY (gid);


--
-- TOC entry 3438 (class 2606 OID 39380)
-- Name: parques_naturales_canarias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_naturales_canarias
    ADD CONSTRAINT parques_naturales_canarias_pkey PRIMARY KEY (gid);


--
-- TOC entry 3423 (class 2606 OID 38640)
-- Name: parques_naturales_esp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques_naturales_esp
    ADD CONSTRAINT parques_naturales_esp_pkey PRIMARY KEY (gid);


--
-- TOC entry 3458 (class 2606 OID 48632)
-- Name: provincias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY provincias
    ADD CONSTRAINT provincias_pkey PRIMARY KEY (gid);


--
-- TOC entry 3435 (class 2606 OID 39320)
-- Name: reservas_naturales_canarias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reservas_naturales_canarias
    ADD CONSTRAINT reservas_naturales_canarias_pkey PRIMARY KEY (gid);


--
-- TOC entry 3420 (class 2606 OID 38262)
-- Name: reservas_naturales_esp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reservas_naturales_esp
    ADD CONSTRAINT reservas_naturales_esp_pkey PRIMARY KEY (gid);


--
-- TOC entry 3453 (class 2606 OID 42447)
-- Name: zonas2_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY zonas
    ADD CONSTRAINT zonas2_pkey PRIMARY KEY (sitecode);


--
-- TOC entry 3454 (class 1259 OID 47778)
-- Name: distancias_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX distancias_geom_idx ON distancias USING gist (geom);


--
-- TOC entry 3448 (class 1259 OID 41120)
-- Name: incendios_ine_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX incendios_ine_idx ON incendios USING btree (ine);


--
-- TOC entry 3445 (class 1259 OID 39508)
-- Name: monumentos_naturales_canrarias_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX monumentos_naturales_canrarias_geom_idx ON monumentos_naturales_canarias USING gist (geom);


--
-- TOC entry 3424 (class 1259 OID 38914)
-- Name: monumentos_naturales_esp_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX monumentos_naturales_esp_geom_idx ON monumentos_naturales_esp USING gist (geom);


--
-- TOC entry 3449 (class 1259 OID 41119)
-- Name: municipio_ine_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX municipio_ine_idx ON municipios USING btree (codigo);


--
-- TOC entry 3430 (class 1259 OID 39306)
-- Name: otros_esp_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX otros_esp_geom_idx ON otros_esp USING gist (geom);


--
-- TOC entry 3442 (class 1259 OID 39457)
-- Name: paisajes_protegidos_canarias_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX paisajes_protegidos_canarias_geom_idx ON paisajes_protegidos_canarias USING gist (geom);


--
-- TOC entry 3427 (class 1259 OID 38971)
-- Name: paisajes_protegidos_esp_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX paisajes_protegidos_esp_geom_idx ON paisajes_protegidos_esp USING gist (geom);


--
-- TOC entry 3439 (class 1259 OID 39415)
-- Name: parques_nacionales_canarias_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX parques_nacionales_canarias_geom_idx ON parques_nacionales_canarias USING gist (geom);


--
-- TOC entry 3415 (class 1259 OID 32459)
-- Name: parques_nacionales_esp_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX parques_nacionales_esp_geom_idx ON parques_nacionales_esp USING gist (geom);


--
-- TOC entry 3436 (class 1259 OID 39399)
-- Name: parques_naturales_canarias_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX parques_naturales_canarias_geom_idx ON parques_naturales_canarias USING gist (geom);


--
-- TOC entry 3421 (class 1259 OID 38800)
-- Name: parques_naturales_esp_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX parques_naturales_esp_geom_idx ON parques_naturales_esp USING gist (geom);


--
-- TOC entry 3433 (class 1259 OID 39369)
-- Name: reservas_naturales_canarias_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reservas_naturales_canarias_geom_idx ON reservas_naturales_canarias USING gist (geom);


--
-- TOC entry 3418 (class 1259 OID 38485)
-- Name: reservas_naturales_esp_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reservas_naturales_esp_geom_idx ON reservas_naturales_esp USING gist (geom);


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 8
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-05-30 12:05:17

--
-- PostgreSQL database dump complete
--

