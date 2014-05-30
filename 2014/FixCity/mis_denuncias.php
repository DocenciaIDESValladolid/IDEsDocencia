<html>
<head>
	<title>FixCity - Mis denuncias</title>
	<script src="jquery-1.9.0.js"></script>
    <script src="jquery.mobile-1.4.2.min.js"></script>
</head>
<body>
<?php
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	
	@ $id_facebook = $_POST['id'];
	//$id_facebook = "10201589618256882";
	$query = <<< SQL
SELECT 
  denuncias.id_denuncia, 
  denuncias.texto, 
  denuncias.fecha, 
  st_x(st_centroid(st_transform(denuncias.the_geom,3857))) as x, st_y(st_centroid(st_transform(denuncias.the_geom,3857))) as y , 
  denuncias.email, 
  denunciantes.fecha as fecha_denunciante, 
  denunciantes.id_denunciante, 
  provincias.nombre as nombre_provincia, 
  municipios.nombre as nombre_municipio, 
  municipios.codigoine as id_municipio, 
  estado_usuario.fecha as fecha_estado_usuario, 
  estado_usuario.estado
FROM 
  public.denuncias, 
  public.denunciantes, 
  public.municipios, 
  public.provincias, 
  public.estado_usuario
WHERE 
  denuncias.id_denuncia = denunciantes.id_denuncia AND
  denuncias.codigoine = municipios.codigoine AND
  denuncias.id_denuncia = estado_usuario.id_denuncia AND
  municipios.provincia = provincias.id_provincia AND
  denunciantes.id_denunciante = $1
ORDER BY
  denunciantes.fecha DESC;
SQL;

	require('db.php');			// Fichero de conexión a la base de datos

//"SELECT * FROM denuncias WHERE id_denuncia IN
//				(SELECT id_denuncia FROM estado_usuario WHERE id_usuario = '$id_facebook') ORDER BY fecha;";
	$result = pg_prepare($db,'Mis denuncias', $query);
// Execute the prepared query.  Note that it is not necessary to escape the string $id in any way
	$result = pg_execute($db, 'Mis denuncias', array($id_facebook));
	$row=pg_fetch_array($result);
	
	echo "<table>";

	/*
	while ($row = pg_fetch_row($result)) {
		echo "$row[0]  $row[1] $row[2] $row[3] $row[4]";
	}
	*/

	while($row = pg_fetch_array($result) ) 
	{
	$id_denuncia= $row['id_denuncia'];
		echo '<tr><td>Municipio:'. $row['nombre_municipio'].'</td>'.
			'<td>Provincia:'. $row['nombre_provincia'].'</td>'.
			'<td>Fecha: '.$row['fecha'].'</td>'.
			'<td>Conflicto: '.$row['texto'].'</td>';
		
		$query_imagenes = 'SELECT * FROM imagenes WHERE id_denuncia = $1';
		$result_imagenes = pg_prepare($db,'Imagenes', $query_imagenes);
		$result_imagenes = pg_execute($db, 'Imagenes',array($id_denuncia));
		while($imagen = pg_fetch_array($result_imagenes) ) {
			echo '<td><img src="'.$imagen['ruta'].'"/></td>';
		}
		echo "</tr>";
	}
	echo "</table>";
	
?>
</body>
</html>
