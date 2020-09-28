--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: nishgowda
--

CREATE TABLE public.jobs (
    jid integer NOT NULL,
    website character varying(140) NOT NULL,
    price integer NOT NULL,
    uid integer,
    created_at character varying(255) NOT NULL,
    status character varying(140),
    product character varying(140)
);


ALTER TABLE public.jobs OWNER TO nishgowda;

--
-- Name: alerts_aid_seq; Type: SEQUENCE; Schema: public; Owner: nishgowda
--

CREATE SEQUENCE public.alerts_aid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alerts_aid_seq OWNER TO nishgowda;

--
-- Name: alerts_aid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishgowda
--

ALTER SEQUENCE public.alerts_aid_seq OWNED BY public.jobs.jid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: nishgowda
--

CREATE TABLE public.users (
    uid integer NOT NULL,
    email character varying(225) NOT NULL,
    name character varying(225) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO nishgowda;

--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: nishgowda
--

CREATE SEQUENCE public.users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_uid_seq OWNER TO nishgowda;

--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishgowda
--

ALTER SEQUENCE public.users_uid_seq OWNED BY public.users.uid;


--
-- Name: jobs jid; Type: DEFAULT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.jobs ALTER COLUMN jid SET DEFAULT nextval('public.alerts_aid_seq'::regclass);


--
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_uid_seq'::regclass);


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: nishgowda
--

COPY public.jobs (jid, website, price, uid, created_at, status, product) FROM stdin;
5	godaddy	15	6	2020-09-14 02:45:34	completed	tweetcode.com
4	namecheap	10	6	2020-09-14 00:15:07	processing	tweetcodes.codes
6	steam	30	6	2020-09-16 02:02:51	processing	https://store.steampowered.com/app/1259970/eFootball_PES_2021/
7	amazon	60	6	2020-09-26 17:35:18	processing	https://store.steampowered.com/app/311210/Call_of_Duty_Black_Ops_III/
8	steam	50	6	2020-09-27 15:40:10	processing	https://store.steampowered.com/app/1225330/NBA_2K21/
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nishgowda
--

COPY public.users (uid, email, name, password) FROM stdin;
2	bob3@gmail.com	bob2	$2b$10$j.DePUZ9ytgUvhbSbMeUteJEnkLjVkS0VSaeMhj5JMMENPooqoXaO
5	nishman606@gmail.com	Nish Gowda	 
6	joe@gmail.com	joe	$2b$10$tKZXVtar/TSgsKbB/l.Ko.q/JY9r.CIj46r0SJfU4mwq/vuuJfskq
\.


--
-- Name: alerts_aid_seq; Type: SEQUENCE SET; Schema: public; Owner: nishgowda
--

SELECT pg_catalog.setval('public.alerts_aid_seq', 8, true);


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: nishgowda
--

SELECT pg_catalog.setval('public.users_uid_seq', 6, true);


--
-- Name: jobs alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (jid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- Name: jobs alerts_uid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT alerts_uid_fkey FOREIGN KEY (uid) REFERENCES public.users(uid);


--
-- PostgreSQL database dump complete
--

