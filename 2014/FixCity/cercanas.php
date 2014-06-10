<html>
<head>
	<title>FixCity - Cercanas</title>
	<!--<script src="jquery-1.9.0.js"></script>
    <script src="jquery.mobile-1.4.2.min.js"></script>-->
</head>
<body>
<?php
$punto = "select the_geom from denuncias;";

$query  = 	"SELECT id_denuncia, ST_Distance(
			ST_GeomFromText('POINT(".e.lon." ".e.lat.")',4326),
			ST_GeomFromText('POINT(' || longitud || ' ' || latitud || ')',4326),
			FROM denuncias 
			ORDER BY distancia ASC 
			LIMIT 1;";



echo $query;
?>

<!--
/*
SELECT ST_Distance(a.the_geom, b.the_geom)
FROM denuncias a, denuncias b
WHERE a.id_denuncia='110' AND b.id_denuncia='111';*/
-->