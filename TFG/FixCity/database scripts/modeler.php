<?php
session_start();

class Modeler{
	
	public $estado=false; 	//Variable que indica si existe conexión con la base de datos
	public $message=''; 	//Variable que contendra la información relativa a la operación
	public $db;
	
	
	/* Función que prepara las cadenas de texto para ser introducidas en la base de datos */
	private function input_data($data){
		$data = trim($data);
		$data = addslashes($data);
		return $data;
	}
	
	/* Función que prepara las cadenas leídas de la base de datos para ser mostradas correctamente */
	public function output_data($data){
		return stripslashes($data);
	}
	
	/* Función para conectar con la base de datos */
	private function connect(){	
		$this->db = mysqli_connect("myhost","myuser","mypassw","mybd");
		if (mysqli_connect_errno())
		{
			$this->message = $this->message . "Error, no se ha podido establecer la conexion: ".mysqli_connect_error();
			return false;
		}
		else{			
			return true;
		}
	}
	
	/* Función para cerrar la conexión con la base de datos */
	private function close_conection(){
		mysqli_close($this->db);
		$this->estado=false;
	}
	
	/* Función que permite realizar consultas a la base de datos */
	public function query_sql($sql){	
		$this->connect();
		$data = mysqli_query($this->con,$sql);
		$this->close_conection();
		return $data;
	}
	
	
	/* ------------------------------------ *
	 *										*
	 *				 GETTERS				*
	 *										*	
	 * ------------------------------------ */

	/* Función que devuelve todas las denuncias. */
	
	/* Función que devuelve las denuncias para determinada dirección.
	   Pasar localización de la dirección.*/
	
	/* Función que devuelve las denuncias en un determinado radio.
	   Pasar como parámetros: punto y radio. */
	
	/* Función que devuelve las denuncuas para determinado municipio.
	   Pasar como datos el polígono del municipio. */
	
	
	/* Función para devolver las 10 últimas denuncias relacionadas con una ubicación (en un radio de 2000 metros) */
	private function getUltimasDenuncias($lon, $lat){
		$sql = "SELECT * FROM denuncias WHERE 
			ST_Distance(ST_GeomFromText('POINT(".$lon." ".$lat.")',4326), denuncias.localizacion)<2000 ORDER BY fecha DESC;";
		
		$denuncias = mysqli_query($this->db,$sql);
		// Sólo nos interesan los 10 primeros resultados
		// Recorrer el bucle 10 veces y almacenarlo en una nueva variable ($denuncias)
		return $denuncias;
	}
	
	

	/* ------------------------------------ *
	 *										*
	 *				 SETTERS				*
	 *										*	
	 * ------------------------------------ */
	 
	/* Función que permite introducir una denuncia en la base de datos. 
	   Recibe como parámetros el texto, la longitud y latitud y el 
	   identificador de usuario que denuncia. */
	private function setDenuncia($text, $lon, $lat, $id_usuario){

		$text = input_data($text);

		// Almacenamos información específica de la denuncia
		$sql = "INSERT INTO denuncias (id_denuncia, texto, localizacion, fecha) VALUES
			(default,'".$text."',ST_GeomFromText('POINT(".$lon." ".$lat.")', 4326),".date('Y-m-d').");"; 	
		$denuncia = mysqli_query($this->db,$sql);
		
		if($denuncia){
			// Obtenemos el id_denuncia con el que se ha guardado la denuncia introducida
			$query = "SELECT LAST (id_denuncia) FROM denuncias";
			$id_denuncia = mysqli_query($this->db,$query);
			// Una vez obtenido el id_denuncia, podemos proseguir con la introducción de datos en la BD.
			if($id_denuncia){
				// Primera línea que identifica el estado de la denuncia, según el ayuntamiento.
				$sql = "INSERT INTO estado_ayto (id_denuncia, id_usuario, fecha, estado) VALUES
						(".$id_denuncia.",".$id_usuario.",".date('Y-m-d').",0);";
				$estado_ayto = mysqli_query($this->db,$sql);
				// Primera línea que identifica el estado de la denuncia, según los usuarios.
				$sql = "INSERT INTO estado_usuario (id_denuncia, id_usuario, fecha, estado) VALUES
						(".$id_denuncia.",".$id_usuario.",".date('Y-m-d').",0);";
				$estado_usuario = mysqli_query($this->db,$sql);
				// Tabla de usuarios que apoyan la denuncia
				$sql = "INSERT INTO denunciantes (id_denuncia, id_usuario, fecha) VALUES
						(".$id_denuncia.",".$id_usuario.",".date('Y-m-d').");";
				$denunciates = mysqli_query($this->db,$sql);
				
				if($estado_ayto || $estado_usuario || $denunciates){
					return true;
				}
				else return false;
			}
			else return false;
		}
		else return false;
	}
	
	

}