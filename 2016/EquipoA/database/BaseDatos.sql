--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-06-02 18:28:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 26442)
-- Name: avisos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE avisos (
    gid integer NOT NULL,
    id numeric(10,0),
    geom geometry(Point),
    nombre character varying(30),
    apellidos character varying(30),
    email character varying(30),
    alergias character varying(30)
);


ALTER TABLE avisos OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 26440)
-- Name: avisos_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE avisos_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE avisos_gid_seq OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 198
-- Name: avisos_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE avisos_gid_seq OWNED BY avisos.gid;


--
-- TOC entry 201 (class 1259 OID 34345)
-- Name: clasificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE clasificacion (
    codigo numeric NOT NULL,
    "usos del suelo" character varying(100)
);


ALTER TABLE clasificacion OWNER TO postgres;

--
-- TOC entry 3276 (class 2604 OID 26445)
-- Name: gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY avisos ALTER COLUMN gid SET DEFAULT nextval('avisos_gid_seq'::regclass);


--
-- TOC entry 3404 (class 0 OID 26442)
-- Dependencies: 199
-- Data for Name: avisos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY avisos (gid, id, geom, nombre, apellidos, email, alergias) FROM stdin;
3	3	0101000000EBBCB067A7A018C070CB9396E60F4540	Pablo	Marqués Gómez	pamago@gmail.com	bétula
4	4	01010000009608CA44F3A018C04CC24E96B40F4540	Alberto	Borbón Prieto	albopr@gmail.com	castanea
5	5	0101000000F24D3573359C18C07E2A9622020F4540	Marta	Casado González	macago@gmail.com	olea
6	6	010100000090772B2A759A18C0E86E82E5860F4540	Rebeca	Velasco Encinas	rebeen@gmail.com	plantago
7	7	010100000005E49B343B9518C081E4C4F7F60F4540	Raúl	González Blanco	eternocapi@gmail.com	plátanus
8	8	010100000095CEBA5C529218C0BD140FD4AC0F4540	Antonio	Pajuelo Martínez	anpama@gmail.com	quercus
10	10	010100000087C97FBD42A518C0046D6AFF1B0F4540	Óscar	Aznar Zapatero	osazza@gmail.com	ruméx
9	9	010100000043717D7B6B9518C0777CD0A6DF0E4540	Daniel	González Puyol	dagopu@gmail.com	pinus
11	11	01010000008A5A52F6A0C118C05CDB7FF7C40F4540	Diego	Lozano Castro	diloca@gmail.com	amarantaceae
12	12	0101000000C373D692E7BF18C0E2DD70D2800E4540	Hannibal	López Uribarri	halour@gmail.com	qupresáceas
1	1	0101000000DA26BD9E29A218C0691DCE1AC40F4540	Jose Luis	Martínez García	jomaga@gmail.com	populus
13	13	0101000000041E523344B418C0E7514175F20A4540	Fenix	Otegui Igartiburu	feotig@gmail.com	populus
15	16	010100000050B06E1984A118C0206BC51139094540	Murdok	Loquera Del Bosque	mulodebo@gmail.com	gramíneas
14	14	01010000002A1083C6369218C0F1563D3A5A134540	Barracus	Clemente Ortega	baclor@gmail.com	castanea
2	2	01010000001340413B70A018C03615958DC70F4540	Juan Luis	Pardo Hernández	jupahe@gmail.com	gramíneas
\.


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 198
-- Name: avisos_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('avisos_gid_seq', 15, true);


--
-- TOC entry 3405 (class 0 OID 34345)
-- Dependencies: 201
-- Data for Name: clasificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY clasificacion (codigo, "usos del suelo") FROM stdin;
111	Tejido urbano continuo
112	Tejido urbano discontinuo
121	Zonas industriales y comerciales
122	Redes viarias, ferroviarias y terrenos asociados
123	Zonas portuarias
124	Aeropuertos
131	Zonas de extraccion minera
132	Escombreas y vertederos
133	Zonas en construccion
141	Zonas verdes urbanas
142	Instalaciones deportivas y recreativas
211	Tierras de labor en secano
212	Terrenos regados permanentemente
213	Arrozales
221	Viñedos
222	Frutales y plantaciones de bayas
223	Olivares
231	Prados y praderas
241	Cultivos anuales asociados con cultivos permanentes
242	Mosaicos de cultivos
243	Terrenos principalmente agricolas con importantes espacios de vegetacion natural
244	Sistemas agro-forestales
311	Bosques de frondosas
312	Bosques de coniferas
313	Bosque mixto
321	Pastizales naturales
322	Landas y matorrales mesofilos
323	Vegetacion esclerofila
324	Matorral boscoso de transicion
331	Playas, dunas y arenales
332	Roquedo
333	Espacios con vegetacion escasa
334	Zonas quemadas
335	Glaciares y niveles permanentes
411	Humedales y zonas pantanosas
412	Turberas y prados turbosos
421	Marismas
422	Salinas
423	Zonas llanas intermareales
511	Cursos de agua
512	Laminas de agua
521	Lagunas costeras
522	Estuarios
523	Mares y oceanos
\.


--
-- TOC entry 3279 (class 2606 OID 26447)
-- Name: avisos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY avisos
    ADD CONSTRAINT avisos_pkey PRIMARY KEY (gid);


--
-- TOC entry 3281 (class 2606 OID 34354)
-- Name: clasificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clasificacion
    ADD CONSTRAINT clasificacion_pkey PRIMARY KEY (codigo);


--
-- TOC entry 3277 (class 1259 OID 26451)
-- Name: avisos_geom_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX avisos_geom_idx ON avisos USING gist (geom);


-- Completed on 2016-06-02 18:28:30

--
-- PostgreSQL database dump complete
--

