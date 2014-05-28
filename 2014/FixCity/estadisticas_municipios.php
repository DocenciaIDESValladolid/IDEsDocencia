
<?php
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos

	// Lectura de base de datos
	$municipios_mas_resuelven = 
		"SELECT codigoine, 
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END)*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
		SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
		FROM estado_usuario GROUP BY codigoine
		ORDER BY Percentage DESC LIMIT 10;";
	$result = pg_exec($db, $municipios_mas_resuelven);
	// Mostramos por pantalla la consulta
	/*while($row = pg_fetch_array($result) ) {
		echo "Codigoine: ".$row[0] . " Porcentaje de casos resueltos:" . 
				$row[1] . " Num Resueltos: " . $row[2] . " Num Total: " . $row[3];
		echo "<br>";
	}*/
	
	
	
	header('Content-Type: application/json');
		echo "[";
		
		while($row = pg_fetch_array($result)) {
			$array = array();	
			$array['codigoine']="\"$row[0]\"";
			$array['porcentaje']="\"$row[1]\"";
			echo '{'+join(',',$array)+'} ,';
		}
		echo "]";
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	
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
	
	// Municipios con que mas conflictos reciben
	echo'<br>Municipios que MAS conflictos reciben:<br>';
	// Lectura de base de datos
	$municipios_mas_reciben = 
		"SELECT id_ayto, COUNT(estado) AS Percentage FROM estado_ayto
			WHERE estado = 0 GROUP BY id_ayto ORDER BY Percentage DESC LIMIT 10;";
	$result = pg_exec($db, $municipios_mas_reciben);
	// Mostramos por pantalla la consulta
	while($row = pg_fetch_array($result) ) {
		echo "Municipio: " . $row[0] . " Num Total: " . $row[1];
		echo "<br>";
	}
	
	*/


?>
