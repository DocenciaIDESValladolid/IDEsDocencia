CREATE TABLE puntosrecarga(
	ID serial NOT NULL,
	"OperatorInfo" character(255),
	"UsageTypeTitle" varchar(255),
	"AddressInfo/Title" varchar(255),
	"AddressInfo1" varchar(255),
	"AddressInfo2" varchar(255),
	"AddressInfo/Latitude" float,
	"AddressInfo/Longitude" float,
	"NumberOfPoints" numeric(2),
	"ConnectionType" varchar(255),
	"ConnectionAmps" float,
	"ConnectionVoltage" float,
	"ConnectionPowerKW" float,
	geom geometry(POINT,4326)
);

COPY puntosrecarga("OperatorInfo", "UsageTypeTitle", "AddressInfo/Title", "AddressInfo1", "AddressInfo2", "AddressInfo/Latitude", "AddressInfo/Longitude", "NumberOfPoints", "ConnectionType", "ConnectionAmps", "ConnectionVoltage", "ConnectionPowerKW")
FROM 'C:\estacionesLunes.csv' DELIMITER ';' CSV HEADER;

UPDATE puntosrecarga SET geom=ST_SetSRID(ST_MakePoint("AddressInfo/Longitude", "AddressInfo/Latitude"),4326);