<?php
session_start();

date_default_timezone_set("Europe/Madrid");

@ $login=$_POST['login'];
@ $password=$_POST['password'];
 
  $login = trim($login);
  $password = trim($password);
  

/*
  @ $db = mysql_pconnect('localhost', 'root', 'dakitumysql');
   if (!$db)
   {
     echo 'Error: No se ha podido realizar la conexión con la Base de Datos. Por favor, inténtelo de nuevo más tarde.';
     exit;
 	}
 	
*/
  include 'conexion_db.php';  
  if (!$login || !$password)
  {
	 header("Location: login.php");
  }

//echo "<br>" . $query . "<br>";//comprobamos el valor de las variables introducidas
		
		//Simplificamos código para cada vez que tengamos que hacer un consulta.
		$query="select * from clientes where login ='".$login."' AND password = '".$password."'";
		 //echo $query;
		$re=pg_query($query) or die(pg_cancel_query());
		$num_resultados=mysql_num_rows($re);
		$row=pg_fetch_array($re);
		$query="select * from clientes where login ='".$login."' AND password = '".$password."'";
		
		//Le pasamos al while el resultado de la consulta. Cada paso en el bucle avanza una fila.
		if($num_resultados>0)
		{
			$_SESSION['Usuario']=$row['login'];
			$_SESSION['password']=$row['password'];
			header("Location: indexRe.php");
		}
		else	
		{
			header("Location: ../tienda.html");

		}
		
		
?>

