CREATE TABLE usuarios (
  _id SERIAL,
  plataforma int,	
  /*
	0:	Facebook
	1:	Twitter
	2:	Google+
  */
  ristra text,
  PRIMARY KEY (_id)
);


CREATE TABLE usuarios (
  _id int NOT NULL AUTO_INCREMENT,
  plataforma smallint(2),	
  /*
	0:	Facebook
	1:	Twitter
	2:	Google+
  */
  ristra text,
  PRIMARY KEY (_id)
);