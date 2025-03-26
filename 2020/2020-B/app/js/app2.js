
/*Función encargada de recoger los valores introducidos por el usuario
Radio= radio de cobertura en metros
NiveldeOscuridad= rango que se introducirá en la consulta Buffer_PolygonExtraction*/
$( "#muestraValores" ).on( "click", function() {
    
    //Variables que introduce el usuario por teclado
    var Radio = document.getElementById("Radio");
    var NivelOscuridad= document.getElementById("NivOscuridad").value;
    
    //Variable view
    var view = new ol.View({
        //las de Madrid son -413011,4941251
        center: [-528137, 5115495],//las coordenadas de Valladolid 
        zoom: 7.5,
        minZoom: 2
    });
    
    //Variable geolocation
    var geolocation = new ol.Geolocation({
        projection: view.getProjection(),
        trackingOptions: {
            enableHighAccuracy: true,
            maximumAge: 0
        },
        tracking: true
    });
    
    //Comprobamos que el usuario ha permitido localizar su ubicación al navegador
    if(geolocation.getPosition()==null)
    {
		alert("Debe permitir al negador encontrar su ubicación");
        return;
    }
    
    //Javi -> obtiene de nuevo la posición en la que se cuentra el usuario
	var ubica = geolocation.getPosition();
    
    //Javi -> crea una nueva geometría de ol(openLayers) que es un punto con las coordenadas del usuario
	var origen=new ol.geom.Point([ubica[0],ubica[1]]);
    
    //Transforma las coordenadas al sistema de referencia que sea necesario.
	origen.transform("EPSG:4258","EPSG:4258");
    
    alert("Este es el radio introducido: "+Radio.value +"\n El nivel de oscuridad introducido es: "+ NivelOscuridad + "\n Ubicación del usuario" + ubica);
    
    //Recogemos las features que forman la capa de zonas oscuras (el await es para que espere la secuencia del programa hasta que termine).
    var capa_zonas_oscuras = await Consulta_Buffer_PolygonExtraction(Radio,NivelOscuridad,origen);
    
    //Recogemos las features que forman la capa de zonas recomendadas (intersección entre zonas oscuras con capa de usos del suelo ya filtrada).
    var capa_zonas_recomendadas = await Consulta_Intersection(capa_zonas_oscuras);
    
    //Recogemos el punto de destino (entre la ubicación del usuario y la zona más cercana de la capa de zonas recomendadas)
    var punto_destino = await Consulta_Snap(capa_zonas_recomendadas,origen);
    
    //Realizamos la consulta a Cartociudad para que nos de la ruta que hay entre origen del usuario y punto destino
    var ruta = await Consulta_Cartociudad(origen,punto_destino);

    });

/*
    Función para realizar la consulta WPS PolygonExtraction
    Consiste en crear un buffer circular de centro (ubicación usuario) y radio el introducido por teclado
    Proporcionamos el rango de luminosidad que el usuario introdujo por teclado
    Nos devuelve un fichero json (círculo con las zonas de luminosidad que desea el usuario
    Javi -> el async indica que es una función asíncrona y devuelve un objeto AsyncFunction (Promise)
    Se suele utilizar para poner un await, que pausa la ejecución y espera hasta que devuelve un objeto Promise

*/
function Consulta_Buffer_PolygonExtraction(Radio,NivelOscuridad,origen)
{
    var layerWPS=`<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
	<ows:Identifier>ras:PolygonExtraction</ows:Identifier>
	<wps:DataInputs>
		<wps:Input>
			<ows:Identifier>data</ows:Identifier>
			<wps:Reference mimeType="image/tiff" xlink:href="http://geoserver/wcs" method="POST">
        <wps:Body>
          <wcs:GetCoverage service="WCS" version="1.1.1">
            <ows:Identifier>Proyecto:Contaminacion_luminica</ows:Identifier>
            <wcs:DomainSubset>
              <ows:BoundingBox crs="http://www.opengis.net/gml/srs/epsg.xml#3857">
                <ows:LowerCorner>-792919.4092452168 4871676.572923876</ows:LowerCorner>
                <ows:UpperCorner>-194713.38067853975 5351057.36307961</ows:UpperCorner>
              </ows:BoundingBox>
            </wcs:DomainSubset>
            <wcs:Output format="image/tiff"/>
          </wcs:GetCoverage>
        </wps:Body>
      </wps:Reference>
		</wps:Input>
		<wps:Input>
			<ows:Identifier>roi</ows:Identifier>
			<wps:Reference mimeType="text/xml; subtype=gml/3.1.1" xlink:href="http://geoserver/wps" method="POST">
				<wps:Body>
					<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
						<ows:Identifier>geo:buffer</ows:Identifier>
						<wps:DataInputs>
							<wps:Input>
								<ows:Identifier>geom</ows:Identifier>
								<wps:Data>
									<wps:ComplexData mimeType="application/wkt"><![CDATA[POINT(${origen.flatCoordinates[0].toString()} ${origen.flatCoordinates[1].toString()})]]></wps:ComplexData>
								</wps:Data>
							</wps:Input>
							<wps:Input>
								<ows:Identifier>distance</ows:Identifier>
								<wps:Data>
									<wps:LiteralData>${Radio}</wps:LiteralData>
								</wps:Data>
							</wps:Input>
							<wps:Input>
								<ows:Identifier>capStyle</ows:Identifier>
								<wps:Data>
									<wps:LiteralData>Round</wps:LiteralData>
								</wps:Data>
							</wps:Input>
						</wps:DataInputs>
						<wps:ResponseForm>
							<wps:RawDataOutput mimeType="application/json">
								<ows:Identifier>result</ows:Identifier>
							</wps:RawDataOutput>
						</wps:ResponseForm>
					</wps:Execute>
				</wps:Body>
			</wps:Reference>
		</wps:Input>
		<wps:Input>
			<ows:Identifier>ranges</ows:Identifier>
			<wps:Data>
				<wps:LiteralData>${NivelOscuridad}</wps:LiteralData>
			</wps:Data>
		</wps:Input>
	</wps:DataInputs>
	<wps:ResponseForm>
		<wps:RawDataOutput mimeType="application/json">
			<ows:Identifier>result</ows:Identifier>
		</wps:RawDataOutput>
	</wps:ResponseForm>
</wps:Execute>`;  

return fetch("http://localhost:8081/geoserver/wps", {
                    method: "POST",
                    mode: 'no-cors',
                    
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.json();
				}).then(function(json){
                    //Introducimos en la variable features todas las features (capa circular con las zonas oscuras finales) del fichero json
					var features = new ol.format.GeoJSON().readFeatures(json);
                    //Devolvemos tipo Promise por ser async
                    return Promise.resolve(features);									  
				});
}

/*
    Esta función se encarga de realizar la intersección entre la capa de zonas oscuras (una circunferencia de centro ubicación del usuario y
    radio introducido por el usuario, que contiene las zonas de luminosidad que entran dentro del rango que introdujo el usuario) y la capa
    de usos del suelo de cyl (ya filtrada previamente con suelo solamente rural).
*/
function Consulta_Intersection(capa_zonas_oscuras)
{
    var layerWPS=`<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:IntersectionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first feature collection</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/json"><![CDATA[${capa_zonas_oscuras}]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:Proyecto="http://geoserver.org/proyecto">
            <wfs:Query typeName="Proyecto:usos_suelo"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>intersectionMode</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>INTERSECTION</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="application/json">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;  

return fetch("http://localhost:8081/geoserver/web/wps", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.json();
				}).then(function(json){
                    //Introducimos en la variable features todas las features (capa circular con las zonas oscuras finales) del fichero json
					var features = new ol.format.GeoJSON().readFeatures(json);
                    //Devolvemos tipo Promise por ser async
                    return Promise.resolve(features);									  
				});
}


/*
    Esta función se encarga de devolver el punto más cercano (correspondiente a una de las zonas recomendadas) al origen del usuario.
*/
function Consulta_Snap(capa_zonas_recomendadas,origen)
{
    var layerWPS=`<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:Snap</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>features</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/json"><![CDATA[${capa_zonas_recomendadas}]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>point</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/wkt"><![CDATA[${origen}]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="application/json">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;  

return fetch("http://localhost:8081/geoserver/web/wps", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.json();
				}).then(function(json){
                    //Introducimos en la variable features todas las features (capa circular con las zonas oscuras finales) del fichero json
					var features = new ol.format.GeoJSON().readFeatures(json);
                    //Devolvemos tipo Promise por ser async
                    return Promise.resolve(features);									  
				});
}

/*
    Esta función se encarga de conseguir la ruta que hay entre el punto origen y el punto destino.
*/
async function Consulta_Cartociudad(origen,punto_destino)
{  

var layerWPS=`<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.
0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlin
k" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0
http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
	<ows:Identifier>org.cnig.cartociudad.wps.RouteFinder</ows:Identifier>
	<wps:DataInputs>
		<wps:Input>
			<ows:Identifier>waypoints</ows:Identifier>
			<wps:Data>
				<wps:ComplexData mimeType="text/xml">
					<wfs:FeatureCollection xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://
www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:wp="http://localhost/waypoint" xmlns:gml="http://www.opengis.ne
t/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xsi:schemaLocation="http://localhost http://www.opengis.net/wfs
http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml
http://schemas.opengis.net/gml/3.1.1/base/feature.xsd
http://localhost:8080/wps/schemas/waypoint.xsd">
						<gml:featureMembers>
							<wp:waypoint gml:id="1">
								<wp:geom>
									<gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258">
										<gml:pos>${origen[0]} ${origen[1]}</gml:pos>
									</gml:Point>
								</wp:geom>
							</wp:waypoint>
							<wp:waypoint gml:id="2">
								<wp:geom>
									<gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/eps
g.xml#4258">
										<gml:pos>-${punto_destino[0]} ${punto_destino[1]}</gml:pos>
									</gml:Point>
								</wp:geom>
							</wp:waypoint>
						</gml:featureMembers>
					</wfs:FeatureCollection>
				</wps:ComplexData>
			</wps:Data>
		</wps:Input>
	</wps:DataInputs>
	<wps:ResponseForm>
		<wps:ResponseDocument>
			<wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
				<ows:Identifier>routeResult</ows:Identifier>
			</wps:Output>
			<wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
				<ows:Identifier>instructionsResult</ows:Identifier>
			</wps:Output>
		</wps:ResponseDocument>
	</wps:ResponseForm>
</wps:Execute>
    `;
    
return fetch("https://www.cartociudad.es/wps/WebProcessingService", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					var doc = ol.xml.parse(gml);
					var colls = doc.getElementsByTagName("gml:FeatureCollection");
					var coll = colls[0];
                    // WPS uses random namespaces and Featuretypes each request.
					var ns = coll.getAttribute("xmlns:n52");
					var sufix = ns.substring("http://www.52north.org/".length);
					var featuretype = 'Feature-' + sufix;
					var options={
						srsName: projection.getCode(), //proyeccion de openlayers
						featureNS: ns,//poner el necesario en cada caso
						featurePrefix: 'n52',
						featureType: featuretype
						 }
				    // Register the alias for the SRS.
					proj4.defs(WPSSRSname, projection);
					var wfsformat = new ol.format.GML(options);
					var rutacoll =wfsformat.readFeatures(coll);
					return Promise.resolve(rutacoll);
				});		

}

    
