<?php
	/*$host='vulcano.tel.uva.es'; //para el laboratorio
	$user='postgres';
	$pass='postgres';*/
	$host='localhost';
	$user='postgres';
	$pass='postgres';
	$database='avisos';
	
	@$db=pg_pconnect($host,$user,$pass);// establece conexion permanente a la base de datos pconnect con connect no es permanente
	if(!$db)
	{
		echo 'Error: No se ha podido realizar la conexión con la Base de Datos. Por favor, inténtelo de nuevo más tarde.';
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";	
		exit;
	}
	//pg_select($database);
?>