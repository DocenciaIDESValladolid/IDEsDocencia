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
	
			$query = <<< SQL
SELECT 
  denuncias.id_denuncia, 
  denuncias.texto, 
  denuncias.fecha,
  denuncias.id_post,
  st_x(st_centroid(st_transform(denuncias.the_geom,3857))) as x, st_y(st_centroid(st_transform(denuncias.the_geom,3857))) as y , 
  denuncias.email, 
  denunciantes.fecha as fecha_denunciante, 
  denuncias.id_usuario, 
  provincias.nombre as nombre_provincia, 
  municipios.nombre as nombre_municipio, 
  municipios.codigoine as id_municipio, 
  denuncias."Resuelta"
FROM 
  public.denuncias, 
  public.denunciantes, 
  public.municipios, 
  public.provincias 
WHERE 
	denuncias.id_usuario = $1 AND
	denuncias.codigoine = municipios.codigoine AND
	denunciantes.id_denunciante = $1 AND
	denunciantes.id_denuncia= denuncias.id_denuncia AND
	municipios.provincia = provincias.id_provincia
ORDER BY
  denunciantes.fecha DESC;
SQL;
	

	require('db.php');			// Fichero de conexi�n a la base de datos

//"SELECT * FROM denuncias WHERE id_denuncia IN
//				(SELECT id_denuncia FROM estado_usuario WHERE id_usuario = '$id_facebook') ORDER BY fecha;";
	$result = pg_prepare($db,'Mis denuncias', $query);
// Execute the prepared query.  Note that it is not necessary to escape the string $id in any way
	$result = pg_execute($db, 'Mis denuncias', array($id_facebook));
        if(!pg_fetch_array($result)){
            echo '<h1>Aun no ha introducido ninguna denuncia.</h1>';
        }
        else{
            echo '<table border="1">
                    <thead><tr>
                    <th>Denuncia</th>
                    <th>Municipio</th>
                    <th>Fecha</th>
                    <th>Solucionado</th>
                    </tr></thead>
                    <tbody>';
            $query_imagenes = 'SELECT * FROM imagenes WHERE id_denuncia = $1';
            $result_imagenes = pg_prepare($db,'Imagenes', $query_imagenes);
            while($row = pg_fetch_array($result) ) 
            {
            $id_denuncia= $row['id_denuncia'];
            $id_post=$row['id_post'];
                    echo '<tr>';
                    echo '<td>';
                            echo '<a href="detalle.php?id='.$id_denuncia.'" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Detalle</a>';
                    echo '</td>';
                    echo '<td>'. $row['nombre_municipio'].' '.
                            '('. $row['nombre_provincia'].')</td>'.
                            '<td>'.$row['fecha'].'</td>'.
                            '<td align="center">';
                    if($row["Resuelta"]=='f'){
                            echo 'NO';
                            echo '<a href="denuncia_solucionada.php?id='.$id_denuncia.'&res=no" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Solucionar</a>';
                    }
                    else {
                            echo 'SI';
                            echo '<a href="denuncia_solucionada.php?id='.$id_denuncia.'&res=si" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Cambiar estado denuncia</a>';

                    }
                    echo '</td>';
                    echo '<tr><td colspan="5" >Descripción: '.$row['texto'].'</td>';
                    echo '</tr><tr>';
                    echo '<td colspan="5">';		
                    $result_imagenes = pg_execute($db, 'Imagenes',array($id_denuncia));
                    while($imagen = pg_fetch_array($result_imagenes) ) {
                            echo '<img style="max-height:100px;max-width:100px" src="'.$imagen['ruta'].'"/>';
                    }
                    echo "</td></tr>";

            }
            echo "</tbody></table>";
        }

    ?>
</div>
<div data-role="footer">
<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">Back</a>
</div>
</div>
</body>
</html>
