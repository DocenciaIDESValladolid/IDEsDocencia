/**
* Use Cartociudad's WPS RouteFinder.
* Example:
*   var origen=new ol.geom.Point([-4.711188815747704,38.412677594480286]);
*   var destino=new ol.geom.Point([-3.6914211255521665,37.457733926087826]);
*
*	CalculoRuta(origen, destino, ol.proj.get("EPSG:4258")).then(procesaruta);
*	
* @param {Point} from origin of the route.
* @param {Point} to  destination of the route.
* @param {Projection} SRS of the input and output geometries.
* @return {Promise} with an array of {Feature} drawing the route.
*/
function CalculoRuta(from, to, projection){
	var origen= from.getCoordinates();
	var destino= to.getCoordinates();
	var SRScode= projection.getCode().substring(5);
	var WPSSRSname = "http://www.opengis.net/gml/srs/epsg.xml#" + SRScode;

var layerWPS=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
    <ows:Identifier>org.cnig.cartociudad.wps.RouteFinder</ows:Identifier>
    <wps:DataInputs>
        <wps:Input>
            <ows:Identifier>waypoints</ows:Identifier>
    <wps:Data>
                <wps:ComplexData mimeType="text/xml">        
      <wfs:FeatureCollection xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:wp="http://localhost/waypoint" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://localhost http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/feature.xsd http://localhost:8080/wps/schemas/waypoint.xsd">
        <gml:featureMembers>
          <wp:waypoint gml:id="1">
            <wp:geom>
              <gml:Point srsDimension="2" srsName="${WPSSRSname}">
                <gml:pos>${origen[0]} ${origen[1]}</gml:pos>
              </gml:Point>
            </wp:geom>
          </wp:waypoint>
          <wp:waypoint gml:id="2">
            <wp:geom>
              <gml:Point srsDimension="2" srsName="${WPSSRSname}">
                <gml:pos>${destino[0]} ${destino[1]}</gml:pos>
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
    
return fetch("http://www.cartociudad.es/wps/WebProcessingService", {
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