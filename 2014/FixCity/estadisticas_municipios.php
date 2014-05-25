<html>
<head>
	<title>FixCity - Estadísticas</title>
	<script src="jquery-1.9.0.js"></script>
    <script src="jquery.mobile-1.4.2.min.js"></script>
</head>
<body>
<?php
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos
	
	
	echo'<br>Municipios que más resuelven los conflictos.<br>';
	
	$municipios_mas_resuelven = 
		"SELECT id_ayto, 
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END)*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
		SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
		FROM estado_ayto GROUP BY id_ayto
		ORDER BY Percentage DESC LIMIT 10;";
	$result = pg_exec($db, $municipio_mas_resuelven);

	while($row = pg_fetch_array($result) ) {
		echo "Codigoine: ".$row[0] . " Porcentaje de casos resueltos:" . 
				$row[1] . " Num Resueltos: " . $row[2] . " Num Total: " . $row[3];
		echo "<br>";
	}


?>
</body>
</html>