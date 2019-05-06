<?php
	$db = pg_connect("host=localhost user=postgres password=postgres dbname=DronFree");
	if (!$db)
	{
		echo 'Error: No se ha podido realizar la conexion con la Base de Datos. Por favor, intentelo de nuevo mas tarde.';		
		echo "<input type='button' value='Back'>";		
		exit;
	}
?>