Para configurar correctamente las BBDD, hemos realizado los siguientes pasos:

1) Creación de la base de datos con los puntos de recarga. Para ello, ejecutar (en postgres) 
	el fichero TablePuntosRecarga.sql

	Nota: Inicialmente se creaba la BBDD con el fichero puntosRecarga.sql pero al dar problemas
	con el caracter "/" se cambió por el anterior, que inserta todos los datos, por lo que el
	fichero opencharger1.csv no sería necesario.

2) Creación de la base de datos con los diferentes modelos de coches eléctricos. Ejecutar
	(en postgres) fichero coches.sql