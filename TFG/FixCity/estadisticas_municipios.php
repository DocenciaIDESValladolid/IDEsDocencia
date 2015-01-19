
<?php
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos

	@ $cumpli = $_GET['cumpli'];
	
	// Lectura de base de datos
	
	if($cumpli==1){
		// Los más cumplidores
		$municipios_mas_resuelven = 
		"SELECT codigoine, 
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END)*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
		SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
		FROM estado_usuario GROUP BY codigoine
		ORDER BY Percentage DESC LIMIT 10;";
	}
	else if($cumpli==0){
		// Los menos cumplidores
		$municipios_mas_resuelven = 
		"SELECT codigoine, 
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END)*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
		SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
		SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
		FROM estado_usuario GROUP BY codigoine
		ORDER BY Percentage ASC LIMIT 10;";
	}
        else if($cumpli==2){
            $municipios_mas_resuelven = 
                    "SELECT codigoine FROM denuncias GROUP BY codigoine, likes+apoyo ORDER BY likes+apoyo ASC LIMIT 10;";
        }
	$result = pg_exec($db, $municipios_mas_resuelven);
	
	header('Content-Type: application/json');
	$final_result=array();		
	while($row = pg_fetch_array($result)) {
		$final_result[]=$row;
		}
	echo  json_encode($final_result);


?>
