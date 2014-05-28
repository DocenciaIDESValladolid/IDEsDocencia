<html>
<head>
	<title>FixCity - Mis denuncias</title>
	<script src="jquery-1.9.0.js"></script>
    <script src="jquery.mobile-1.4.2.min.js"></script>
</head>
<body>
<?php
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos
	
	//@ $id_facebook = $_POST['id_facebook'];
	$id_facebook = "752480921449446";
	$query = "SELECT * FROM denuncias WHERE id_denuncia IN
				(SELECT id_denuncia FROM estado_usuario WHERE id_usuario = '$id_facebook') ORDER BY fecha;";
	$result = pg_exec($db, $query);

	
	echo "<table>";

	
	while ($row = pg_fetch_row($result)) {
		echo "$row[0]  $row[1] $row[2] $row[3]";
	}
	
	/*
	while($row = pg_fetch_array($result) ) {
		
		$query_municipio = "SELECT nombre, provincia FROM municipios WHERE codigoine = \"$row[4]\";";
		$result_municipio = pg_exec($db, $query_municipio);
		
		$municipio = pg_fetch_array($result_municipio);
		
		$query_provincia = "SELECT nombre FROM provincias WHERE id_provincia = $municipio[1] ";
		$result_provincia = pg_exec($db, $query_provincia);
		
		$provincia = pg_fetch_array($result_provincia);
	
		echo "	<tr>
					<td>Municipio: $municipio[0]</td>
					<td>Provincia: $provincia[0]</td>
					<td>Fecha: $row[3]</td>
					<td>Conflicto: $row[1]</td>";
		
		$query_imagenes = "SELECT ruta FROM imagenes WHERE id_denuncia = $row[0];";
		$result_imagenes = pg_exec($db, $query_imagenes);
		while($imagen = pg_fetch_array($result_imagenes) ) {
			echo "<td><img src=\"$imagen[0]\"/></td>";
		}
		echo "</tr>";
	}
	echo "</table>";*/
	
?>
</body>
</html>