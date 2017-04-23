--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fuentes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE fuentes (
    id bigint NOT NULL,
    fuente_geom geometry NOT NULL,
    codigo_postal character varying,
    via character varying
);


ALTER TABLE fuentes OWNER TO postgres;

--
-- Name: TABLE fuentes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE fuentes IS 'fuentes de agua potable de Madrid';


--
-- Name: fuentes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE fuentes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fuentes_id_seq OWNER TO postgres;

--
-- Name: fuentes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE fuentes_id_seq OWNED BY fuentes.id;


--
-- Name: parques; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE parques (
    id bigint NOT NULL,
    localidad character varying,
    codigo_postal character varying,
    via character varying,
    descripcion text,
    equipamiento character varying,
    url character varying,
    nombre character varying NOT NULL,
    parque_geom geometry NOT NULL
);


ALTER TABLE parques OWNER TO postgres;

--
-- Name: TABLE parques; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE parques IS 'parques de Madrid';


--
-- Name: parques_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE parques_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE parques_id_seq OWNER TO postgres;

--
-- Name: parques_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE parques_id_seq OWNED BY parques.id;


--
-- Name: fuentes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY fuentes ALTER COLUMN id SET DEFAULT nextval('fuentes_id_seq'::regclass);


--
-- Name: parques id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques ALTER COLUMN id SET DEFAULT nextval('parques_id_seq'::regclass);


--
-- Data for Name: fuentes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY fuentes (id, fuente_geom, codigo_postal, via) FROM stdin;
\.


--
-- Name: fuentes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('fuentes_id_seq', 1, false);


--
-- Data for Name: parques; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY parques (id, localidad, codigo_postal, via, descripcion, equipamiento, url, nombre, parque_geom) FROM stdin;
1	Madrid	\N	\N	\N	\N	\N	Bosque del Recuerdo	0101000020E20B000000000000C0F41A41000000001C115141
\.


--
-- Name: parques_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('parques_id_seq', 1, true);


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: fuentes fuentes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY fuentes
    ADD CONSTRAINT fuentes_pkey PRIMARY KEY (id);


--
-- Name: parques parques_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY parques
    ADD CONSTRAINT parques_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

