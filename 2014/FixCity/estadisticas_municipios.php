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
	
	
	echo'<br>Municipios que MAS resuelven los conflictos.<br>';
	// Lectura de base de datos
	$municipios_mas_resuelven = 
		"SELECT id_ayto, 
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END)*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
		SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
		FROM estado_ayto GROUP BY id_ayto
		ORDER BY Percentage DESC LIMIT 10;";
	$result = pg_exec($db, $municipios_mas_resuelven);
	// Mostramos por pantalla la consulta
	while($row = pg_fetch_array($result) ) {
		echo "Codigoine: ".$row[0] . " Porcentaje de casos resueltos:" . 
				$row[1] . " Num Resueltos: " . $row[2] . " Num Total: " . $row[3];
		echo "<br>";
	}
	
	echo'<br>Municipios que MENOS resuelven los conflictos.<br>';
	// Lectura de base de datos
	$municipios_menos_resuelven = 
		"SELECT id_ayto, 
		(SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END)-SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END))*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
		SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
		FROM estado_ayto GROUP BY id_ayto
		ORDER BY Percentage DESC LIMIT 10;";
	$result = pg_exec($db, $municipios_menos_resuelven);
	// Mostramos por pantalla la consulta
	while($row = pg_fetch_array($result) ) {
		echo "Codigoine: ".$row[0] . " Porcentaje de casos no resueltos:" . 
				$row[1] . " Num Resueltos: " . $row[2] . " Num Total: " . $row[3];
		echo "<br>";
	}
	
	echo'<br>Municipios que MAS conflictos reciben:<br>';
	// Lectura de base de datos
	$municipios_mas_reciben = 
		"";
	$result = pg_exec($db, $municipios_mas_reciben);
	// Mostramos por pantalla la consulta
	while($row = pg_fetch_array($result) ) {
		echo ;
		echo "<br>";
	}
	
	


?>
</body>
</html>