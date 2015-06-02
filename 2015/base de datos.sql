--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2015-05-31 14:30:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 253 (class 1259 OID 27038)
-- Name: current_stages; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE current_stages (
    id integer NOT NULL,
    id_path integer NOT NULL,
    id_user character(30) NOT NULL,
    accum_time integer NOT NULL,
    accum_distance integer NOT NULL,
    date timestamp without time zone NOT NULL,
    locations geometry(Point,4326) NOT NULL,
    id_riddle integer
);


--
-- TOC entry 252 (class 1259 OID 27036)
-- Name: current_stages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE current_stages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 252
-- Name: current_stages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE current_stages_id_seq OWNED BY current_stages.id;


--
-- TOC entry 255 (class 1259 OID 27049)
-- Name: paths; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE paths (
    id integer NOT NULL,
    id_stage integer NOT NULL
);


--
-- TOC entry 254 (class 1259 OID 27047)
-- Name: paths_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE paths_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 254
-- Name: paths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE paths_id_seq OWNED BY paths.id;


--
-- TOC entry 257 (class 1259 OID 27057)
-- Name: riddles; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE riddles (
    id integer NOT NULL,
    id_path integer NOT NULL,
    num_riddle integer NOT NULL,
    description character(350) NOT NULL,
    date timestamp without time zone NOT NULL,
    geom geometry(Polygon,4326),
    answer1 character(100),
    answer2 character(100),
    answer3 character(100),
    question character(150),
    correct_answer integer
);


--
-- TOC entry 256 (class 1259 OID 27055)
-- Name: riddles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE riddles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 256
-- Name: riddles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE riddles_id_seq OWNED BY riddles.id;


--
-- TOC entry 249 (class 1259 OID 27022)
-- Name: stages; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE stages (
    id integer NOT NULL,
    name character(20) NOT NULL,
    id_creator character(30) NOT NULL,
    description character(350) NOT NULL,
    date timestamp without time zone NOT NULL,
    uri character(40) NOT NULL
);


--
-- TOC entry 248 (class 1259 OID 27020)
-- Name: stage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE stage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 248
-- Name: stage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE stage_id_seq OWNED BY stages.id;


--
-- TOC entry 251 (class 1259 OID 27030)
-- Name: stages_performed; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE stages_performed (
    id integer NOT NULL,
    id_path integer NOT NULL,
    id_user character(30) NOT NULL,
    "time" integer NOT NULL,
    distance integer NOT NULL,
    date timestamp without time zone NOT NULL
);


--
-- TOC entry 250 (class 1259 OID 27028)
-- Name: stage_performed_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE stage_performed_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 250
-- Name: stage_performed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE stage_performed_id_seq OWNED BY stages_performed.id;


--
-- TOC entry 247 (class 1259 OID 27015)
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    id character(30) NOT NULL,
    name character(20),
    surname character(30),
    email character(30),
    photo character(120)
);


--
-- TOC entry 3490 (class 2604 OID 27041)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY current_stages ALTER COLUMN id SET DEFAULT nextval('current_stages_id_seq'::regclass);


--
-- TOC entry 3491 (class 2604 OID 27052)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY paths ALTER COLUMN id SET DEFAULT nextval('paths_id_seq'::regclass);


--
-- TOC entry 3492 (class 2604 OID 27060)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY riddles ALTER COLUMN id SET DEFAULT nextval('riddles_id_seq'::regclass);


--
-- TOC entry 3488 (class 2604 OID 27025)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY stages ALTER COLUMN id SET DEFAULT nextval('stage_id_seq'::regclass);


--
-- TOC entry 3489 (class 2604 OID 27033)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY stages_performed ALTER COLUMN id SET DEFAULT nextval('stage_performed_id_seq'::regclass);


--
-- TOC entry 3627 (class 0 OID 27038)
-- Dependencies: 253
-- Data for Name: current_stages; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO current_stages (id, id_path, id_user, accum_time, accum_distance, date, locations, id_riddle) VALUES (2, 1, '123456789                     ', 1234, 1234, '2015-04-15 18:23:00', '0101000020E6100000C7A607492CD612C03D3203EE58D44440', NULL);
INSERT INTO current_stages (id, id_path, id_user, accum_time, accum_distance, date, locations, id_riddle) VALUES (3, 1, '123456789                     ', 345345, 234243, '2015-04-15 18:23:00', '0101000020E610000015A83207FED912C0B3CACC5F8DD44440', 2);
INSERT INTO current_stages (id, id_path, id_user, accum_time, accum_distance, date, locations, id_riddle) VALUES (4, 2, '123456789                     ', 0, 0, '2015-04-15 18:23:00', '0101000020E6100000CFE10B96A4DF12C067BC024C85D44440', NULL);
INSERT INTO current_stages (id, id_path, id_user, accum_time, accum_distance, date, locations, id_riddle) VALUES (1, 1, '123456789                     ', 0, 0, '2015-04-29 17:25:51.431', '0101000020E610000025F52C66F0D412C0D194D0C70ED34440', NULL);
INSERT INTO current_stages (id, id_path, id_user, accum_time, accum_distance, date, locations, id_riddle) VALUES (5, 2, '987654321                     ', 1234, 1234, '2015-04-15 19:25:00', '0101000020E6100000C6AF8A6043DD12C0B79B774AD4D34440', NULL);
INSERT INTO current_stages (id, id_path, id_user, accum_time, accum_distance, date, locations, id_riddle) VALUES (131, 1, '987654321                     ', 0, 0, '2015-05-31 14:26:40.067', '0101000020E610000067FEBD369DD212C04E733350BBD44440', 1);


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 252
-- Name: current_stages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('current_stages_id_seq', 131, true);


--
-- TOC entry 3629 (class 0 OID 27049)
-- Dependencies: 255
-- Data for Name: paths; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO paths (id, id_stage) VALUES (1, 1);
INSERT INTO paths (id, id_stage) VALUES (2, 2);


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 254
-- Name: paths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('paths_id_seq', 1, true);


--
-- TOC entry 3631 (class 0 OID 27057)
-- Dependencies: 257
-- Data for Name: riddles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO riddles (id, id_path, num_riddle, description, date, geom, answer1, answer2, answer3, question, correct_answer) VALUES (1, 1, 0, 'prueba                                                                                                                                                                                                                                                                                                                                                        ', '2015-04-15 00:33:00', '0103000020E61000000100000005000000013D2A1622D312C04ED91A75CDD4444096FEBD369DD212C010733350BBD44440D1A5E1B83BD112C061853821D4D44440D4139B5EC9D112C068D96FFCE4D44440013D2A1622D312C04ED91A75CDD44440', NULL, NULL, NULL, NULL, NULL);
INSERT INTO riddles (id, id_path, num_riddle, description, date, geom, answer1, answer2, answer3, question, correct_answer) VALUES (2, 1, 1, 'prueba                                                                                                                                                                                                                                                                                                                                                        ', '2015-04-15 00:34:00', '0103000020E61000000100000005000000ED38CB349CDA12C0972A2D019BD44440557B523A1EDA12C0F174588784D44440D5817FD591D912C076C8693D8FD444400C5812181BDA12C03938FEE7A2D44440ED38CB349CDA12C0972A2D019BD44440', NULL, NULL, NULL, NULL, NULL);
INSERT INTO riddles (id, id_path, num_riddle, description, date, geom, answer1, answer2, answer3, question, correct_answer) VALUES (3, 1, 2, 'prueba                                                                                                                                                                                                                                                                                                                                                        ', '2015-04-15 00:35:00', '0103000020E6100000010000000A000000100F1ABC9CE112C0A341A294F7D3444002212950ADE012C01526AB02D0D344400C69B2453ADF12C0835B0082E2D344403B9F9B337ADF12C02BEE69B1ECD34440CDF275AE67DE12C0E10B010AFAD344405ABEE216F9DE12C0EEEEC14512D444403D0D55D907E012C0A8A1926207D44440D613F1003FE012C0E84AB2C70AD44440B7100186AAE112C0666810CEF9D34440100F1ABC9CE112C0A341A294F7D34440', NULL, NULL, NULL, NULL, NULL);
INSERT INTO riddles (id, id_path, num_riddle, description, date, geom, answer1, answer2, answer3, question, correct_answer) VALUES (4, 1, 3, 'prueba                                                                                                                                                                                                                                                                                                                                                        ', '2015-04-15 00:36:00', '0103000020E61000000100000007000000B2BF072F64E412C0881CCFE6B6D44440CF633B366EE412C06C671AD9B5D44440A3ED6D2B5FE412C0627B61DAB4D4444086493A2455E412C0D43816E8B5D44440F402BADF4EE412C01FC15DB2B6D44440DD3E144A5DE412C0B3E59C9AB7D44440B2BF072F64E412C0881CCFE6B6D44440', NULL, NULL, NULL, NULL, NULL);
INSERT INTO riddles (id, id_path, num_riddle, description, date, geom, answer1, answer2, answer3, question, correct_answer) VALUES (5, 2, 0, 'prueba 2                                                                                                                                                                                                                                                                                                                                                      ', '2015-04-15 00:33:00', '0103000020E610000001000000050000007688C08B7FDD12C00E31D9206CD4444000F8F16E57DD12C0022EBE1A65D444408D74EC14DADC12C0D6FF3CFA66D44440F432212EFDDC12C00E31D9206CD444407688C08B7FDD12C00E31D9206CD44440', NULL, NULL, NULL, NULL, NULL);
INSERT INTO riddles (id, id_path, num_riddle, description, date, geom, answer1, answer2, answer3, question, correct_answer) VALUES (6, 2, 1, 'fdghd                                                                                                                                                                                                                                                                                                                                                         ', '2015-04-15 00:33:00', '0103000020E6100000010000000400000005DF1B1B10E112C07FF5834F53D444403B7C446E1FE012C0BDBD03B14DD44440DB7517D3ABE012C0787242BD5BD4444005DF1B1B10E112C07FF5834F53D44440', NULL, NULL, NULL, NULL, NULL);
INSERT INTO riddles (id, id_path, num_riddle, description, date, geom, answer1, answer2, answer3, question, correct_answer) VALUES (8, 2, 2, 'Encuentra la iglesia más cercana                                                                                                                                                                                                                                                                                                                              ', '2015-04-15 00:33:00', '0103000020E61000000100000006000000A687409DB1DD12C0ED431EB7E4D34440E387403556DD12C087ED26D8D7D34440A88840FD16DC12C0D220FFF7E9D344403E88403D7CDC12C04FC72627F8D344405588407D87DC12C0CA010B7FF7D34440A687409DB1DD12C0ED431EB7E4D34440', NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 256
-- Name: riddles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('riddles_id_seq', 8, true);


--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 248
-- Name: stage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('stage_id_seq', 1, false);


--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 250
-- Name: stage_performed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('stage_performed_id_seq', 1, false);


--
-- TOC entry 3623 (class 0 OID 27022)
-- Dependencies: 249
-- Data for Name: stages; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO stages (id, name, id_creator, description, date, uri) VALUES (1, 'prueba 1            ', '123456789                     ', 'blablabla                                                                                                                                                                                                                                                                                                                                                     ', '2015-04-15 18:23:00', 'URI                                     ');
INSERT INTO stages (id, name, id_creator, description, date, uri) VALUES (2, 'prueba 2            ', '987654321                     ', 'blablabla                                                                                                                                                                                                                                                                                                                                                     ', '2015-04-15 18:23:00', 'URI                                     ');


--
-- TOC entry 3625 (class 0 OID 27030)
-- Dependencies: 251
-- Data for Name: stages_performed; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO stages_performed (id, id_path, id_user, "time", distance, date) VALUES (1, 1, '123456789                     ', 45232, 4235, '2015-04-15 18:23:00');


--
-- TOC entry 3621 (class 0 OID 27015)
-- Dependencies: 247
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO users (id, name, surname, email, photo) VALUES ('123456789                     ', NULL, NULL, NULL, NULL);
INSERT INTO users (id, name, surname, email, photo) VALUES ('987654321                     ', NULL, NULL, NULL, NULL);


--
-- TOC entry 3500 (class 2606 OID 27046)
-- Name: current_stages_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY current_stages
    ADD CONSTRAINT current_stages_pkey PRIMARY KEY (id, id_path);


--
-- TOC entry 3502 (class 2606 OID 27054)
-- Name: paths_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY paths
    ADD CONSTRAINT paths_pkey PRIMARY KEY (id, id_stage);


--
-- TOC entry 3504 (class 2606 OID 27065)
-- Name: riddles_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY riddles
    ADD CONSTRAINT riddles_pkey PRIMARY KEY (id);


--
-- TOC entry 3498 (class 2606 OID 27035)
-- Name: stage_performed_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY stages_performed
    ADD CONSTRAINT stage_performed_pkey PRIMARY KEY (id);


--
-- TOC entry 3496 (class 2606 OID 27027)
-- Name: stage_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY stages
    ADD CONSTRAINT stage_pkey PRIMARY KEY (id);


--
-- TOC entry 3494 (class 2606 OID 27019)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2015-05-31 14:30:33

--
-- PostgreSQL database dump complete
--

