<?php
	$db = pg_connect("host=localhost user=postgres password=veloces13 dbname=Postgre");
	if (!$db)
	{
		echo 'Error: No se ha podido realizar la conexión con la Base de Datos. Por favor, inténtelo de nuevo más tarde.';		
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";		
		exit;
	}
?>