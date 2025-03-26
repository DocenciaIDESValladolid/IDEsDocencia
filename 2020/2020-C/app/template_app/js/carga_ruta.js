function addCapaRuta(){
   var vectorSource = new ol.source.Vector();
    var vector = new ol.layer.Vector({
        name: 'GetFeature result',
      source: vectorSource,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
		  color: 'rgba(24, 0, 249, 1)'
		}),
		stroke: new ol.style.Stroke({
		  color: 'rgba(24, 0, 249, 1)',
		  width: 2
		}),
		image: new ol.style.Circle({
		  radius: 7,
		  fill: new ol.style.Fill({
			color: 'rgba(24, 0, 249, 1)',
		  })
		})
      })
    });

    var cuerpo = `<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
  xmlns:VialSecureInfo="http://itastdevserver.tel.uva.es/IDE2020C"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns="http://www.opengis.net/ogc"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs
                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
  <wfs:Query typeName="VialSecureInfo:Valencia_Tarragona">
    
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
      vectorSource.addFeatures(features);
      map.addLayer(vector);
      add_layer_to_list(vector);
      map.getView().fit(vectorSource.getExtent());
    });
}
