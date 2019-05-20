/**
* Place WPS request.
* Example:
* 
*	var 
*	wpsclient_featurecollection(href, wpsbody, ol.proj.get("EPSG:4258")).then(function (featuresarray){});
*	
* @param {href} url of the server.
* @param {wpsbody} text content of the request.
* @param {namespace}  namespace uri. i.e. "http://itastdevserver.tel.uva.es/ide2019b"
* @param {featuretype} name of the featuretype. i.e. "Aeropuertos3587"
* @param {Projection} SRS of the input and output geometries.
* @return {Promise} with an array of {Feature} with the feature collection.
*/
function wpsclient_featurecollection(href, wpsbody, prefix, namespace, featuretype, projection){
	var SRScode= projection.getCode().substring(5);
	var WPSSRSname = "http://www.opengis.net/gml/srs/epsg.xml#" + SRScode;
    
return fetch(href, {
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
					var ns = coll.getAttribute("xmlns:" + prefix);
					
					var options={
						srsName: projection.getCode(), //proyeccion de openlayers
						featureNS: ns,//poner el necesario en cada caso
						featurePrefix: prefix,
						featureType: featuretype
						 }
				    // Register the alias for the SRS.
					proj4.defs(WPSSRSname, projection);
					var wfsformat = new ol.format.GML(options);
					var rutacoll =wfsformat.readFeatures(coll);
					return Promise.resolve(rutacoll);
				});	
}