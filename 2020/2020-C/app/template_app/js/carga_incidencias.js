function incidenciasRuta(coordenadasRuta){
    var cadenaCoordenadas="";
    for(i=0; i<coordenadasRuta.length; i+=3)
    {
        cadenaCoordenadas = cadenaCoordenadas + coordenadasRuta[i] + "," + coordenadasRuta[i+1] + " ";
    }



    var cuerpo = `<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
  xmlns:VialSecureInfo="http://itastdevserver.tel.uva.es/IDE2020C"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns="http://www.opengis.net/ogc"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs
                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
  <wfs:Query typeName="VialSecureInfo:Incidencias_de_trafico">
      <Filter>
		<DWithin>
		   <PropertyName>geom</PropertyName>
                 <gml:LineString srsName="EPSG:4326"><gml:coordinates>${cadenaCoordenadas}</gml:coordinates>
				</gml:LineString>
		<Distance units="meters">100</Distance>
		</DWithin>
      </Filter>
  </wfs:Query>
</wfs:GetFeature>`;

    // then post the request and add the received features to a layer
    fetch('/geoserver/wfs', {
      method: 'POST',
      headers: {
          "Content-Type": "application/xml; charset=UTF-8"
      },
      //body: new XMLSerializer().serializeToString(featureRequest)
	  body: cuerpo
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      var features = new ol.format.GeoJSON().readFeatures(json);
      vectorSource.clear();
      vectorIncidencias.clear();
      vectorSource.addFeatures(features);
    });
}



function cargaTodasIncidencias(){
    var cuerpo = `<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
  xmlns:VialSecureInfo="http://itastdevserver.tel.uva.es/IDE2020C"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns="http://www.opengis.net/ogc"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs
                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
  <wfs:Query typeName="VialSecureInfo:Incidencias_de_trafico">
     
  </wfs:Query>
</wfs:GetFeature>`;

    // then post the request and add the received features to a layer
    fetch('/geoserver/wfs', {
      method: 'POST',
      headers: {
          "Content-Type": "application/xml; charset=UTF-8"
      },
      //body: new XMLSerializer().serializeToString(featureRequest)
	  body: cuerpo
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      var features = new ol.format.GeoJSON().readFeatures(json);
      rutaLayer.getSource().clear();
      vectorSource.clear();
      vectorIncidencias.addFeatures(features);
      map.getView().fit(vectorIncidencias.getExtent());
    });
}
