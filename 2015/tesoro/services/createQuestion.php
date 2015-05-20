<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
//	include('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $pregunta = filter_var($_POST['textarea'],FILTER_SANITIZE_STRING);	// Texto de la denuncia
	@ $tipo_respuesta = filter_var($_POST['radio-choice-v-2'],FILTER_SANITIZE_STRING);  // tipo de respuesta
	@ $respuesta1 = filter_var($_POST['text-basic1'],FILTER_SANITIZE_STRING); 
	@ $respuesta2 = filter_var($_POST['text-basic2'],FILTER_SANITIZE_STRING); 
	@ $respuesta3 = filter_var($_POST['text-basic3'],FILTER_SANITIZE_STRING); 
	
	
	// Formateamos textos para introducir en la base de datos.
	$pregunta = trim($pregunta);		
	$tipo_respuesta = trim ($tipo_respuesta);
	$respuesta1 = trim($respuesta1);
	$respuesta2 = trim($respuesta2);
	$respuesta3 = trim($respuesta3);
	
	//comprobar longitud
	
	$respusta_final = "$respuesta1." "$" ".$respuesta2." "$" ".$respuesta3.";
	
	if (strlen ($pregunta >= 300))
	{
?>
		<script type="txt/javascrip">
		window.alert("descripcion demasiado larga");
		</script>
<?PHP
		exit;
	}	
	
	
        $result=new stdClass();
        $result->newId=23;
        $result->name = $name;
        $result->description = $description;
        
		$peticion = ""; //peticion a la base de datos para introducir en la tabla correspondiente
		$resultado=mysql_query($peticion);

        echo json_encode($result);
        