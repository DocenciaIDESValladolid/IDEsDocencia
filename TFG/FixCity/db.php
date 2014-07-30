<?php
	$db = pg_connect("host=localhost user=postgres password=testIDELAB dbname=FixCity");
	if (!$db)
	{
		echo 'Error: No se ha podido realizar la conexi�n con la Base de Datos. Por favor, int�ntelo de nuevo m�s tarde.';		
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";		
		exit;
	}
?>