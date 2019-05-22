/**
* Place WPS request.
* Example:
* 	
*	var href = '/geoserver/wps';
*	wpsclient_featurecollection(href, wpsbody, ol.proj.get("EPSG:4258")).then(function (featuresarray){});
*	
* @param {string} href url of the server.
* @param {string} wpsbody text content of the request.
* @param {string} namespace namespace uri. i.e. "http://itastdevserver.tel.uva.es/ide2019b"
* @param {string} featuretype name of the featuretype. i.e. "Aeropuertos3587"
* @param {Projection} projection SRS of the input and output geometries.
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
					var ns = coll.getAttribute("xmlns:" + prefix);
					
					var options={
						srsName: projection.getCode(), //proyeccion de openlayers
						featureNS: namespace,//poner el necesario en cada caso
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

/**
* Write GML Feature collection from an array of Feature
* @param {Feature[]|Promise} array of Features or Promise
* @param {namespace}  namespace uri. i.e. "http://itastdevserver.tel.uva.es/ide2019b"
* @param {featuretype} name of the featuretype. i.e. "Aeropuertos3587"
* @param {Projection} SRS of the input and output geometries.
* @return string GML
*/
async function writeGMLFeatureCollection(features, prefix, namespace, featuretype, projection) {
	var options={
				srsName: projection.getCode(), //proyeccion de openlayers
				featureNS: namespace,
				featurePrefix: prefix,
				featureType: featuretype
				}
	// Hay que esperar a que terminen las anteriores.
	var featuresarray = await features;
	var format = ol.format.GML3();
	var gml = new format.writeFeatures(featuresarray);
	return gml;
}