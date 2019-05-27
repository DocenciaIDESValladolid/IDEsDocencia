CREATE TABLE puntosrecarga(
	ID serial NOT NULL PRIMARY KEY,
	"OperatorInfo/Title" varchar(255),
	"UsageType/Title" varchar(255),
	"AddressInfo/Title" varchar(255),
	"AddressInfo/AddressLine1" varchar(255),
	"AddressInfo/AddressLine2" varchar(255),
	"AddressInfo/Latitude" float,
	"AddressInfo/Longitude" float,
	"NumberOfPoints" numeric(2),
	"Connections/0/ConnectionType/Title" varchar(255),
	"Connections/0/Level/Title" varchar(255),
	"Connections/0/Amps" float,
	"Connections/0/Voltage" float,
	"Connections/0/PowerKW" float,
	geom geometry(POINT,4326)
);

COPY puntosrecarga("OperatorInfo/Title", "UsageType/Title",	"AddressInfo/Title", "AddressInfo/AddressLine1", "AddressInfo/AddressLine2", "AddressInfo/Latitude", "AddressInfo/Longitude", "NumberOfPoints",	"Connections/0/ConnectionType/Title", "Connections/0/Level/Title", "Connections/0/Amps","Connections/0/Voltage", "Connections/0/PowerKW")
FROM 'C:\opencharger1.csv' DELIMITER ';' CSV HEADER;

UPDATE puntosrecarga SET geom=ST_SetSRID(ST_MakePoint("AddressInfo/Longitude", "AddressInfo/Latitude"),4326);