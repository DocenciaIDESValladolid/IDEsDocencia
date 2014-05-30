<html>
<head>
	<title>FixCity - Mis denuncias</title>
	<script src="jquery-1.9.0.js"></script>
    <script src="jquery.mobile-1.4.2.min.js"></script>
 <script src="mobile-base.js"></script>
        <script src="mobile-jq.js"></script>
</head>
<body>
<div data-role="page" data-theme="b">
<div data-role="header" >
	<h1><img src="images/marker-icon-fixit.png" height="24">Mis Denuncias</h1>
</div>
<div data-role="content">
<?php
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	
	@ $id_facebook = $_GET['id'];
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
  estado_usuario.estado as estado_usuario
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

	require('db.php');			// Fichero de conexiÛn a la base de datos

//"SELECT * FROM denuncias WHERE id_denuncia IN
//				(SELECT id_denuncia FROM estado_usuario WHERE id_usuario = '$id_facebook') ORDER BY fecha;";
	$result = pg_prepare($db,'Mis denuncias', $query);
// Execute the prepared query.  Note that it is not necessary to escape the string $id in any way
	$result = pg_execute($db, 'Mis denuncias', array($id_facebook));
	echo "<table>";
	$query_imagenes = 'SELECT * FROM imagenes WHERE id_denuncia = $1';
	$result_imagenes = pg_prepare($db,'Imagenes', $query_imagenes);
	while($row = pg_fetch_array($result) ) 
	{
	$id_denuncia= $row['id_denuncia'];
		echo '<tr>';
		echo '<td>';
		echo '<a href="detalle.php?id='.$id_denuncia.'" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Detalle</a>';
		echo '</td>';
		echo '<td>Municipio:'. $row['nombre_municipio'].'</td>'.
			'<td>Provincia:'. $row['nombre_provincia'].'</td>'.
			'<td>Fecha: '.$row['fecha'].'</td>'.
			'<td>Solucionado: ';
		if($row['estado_usuario']==0){
			echo 'NO</td>';
		}
		else {
			echo 'SÕ</td>';
		}
		echo '<a href="denuncia_solucionada.php?id='.$id_denuncia.'" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Marcar como solucionado</a>';
		echo '</tr>';
		echo '<tr><td colspan="4" >Descripci√≥n: '.$row['texto'].'</td>';
		echo '</tr><tr>';
		echo '<td colspan="6">';		
		$result_imagenes = pg_execute($db, 'Imagenes',array($id_denuncia));
		while($imagen = pg_fetch_array($result_imagenes) ) {
			echo '<img style="max-height:100px;max-width:100px" src="'.$imagen['ruta'].'"/>';
		}
		echo "</td></tr>";
		
	}
	echo "</table>";
	
?>
</div>
<div data-role="footer">
<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">Back</a>
</div>
</div>
</body>
</html>
