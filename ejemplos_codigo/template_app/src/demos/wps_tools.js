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
                    body: wpsbody
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					var doc = ol.xml.parse(gml);
					var colls = doc.getElementsByTagName("wfs:FeatureCollection");
					var coll = colls[0];
                    
					
					var options={
						srsName: projection.getCode(), //proyeccion de openlayers
						featureNS: namespace,//poner el necesario en cada caso
						featurePrefix: prefix,
						featureType: featuretype
						 }
				    // Register the alias for the SRS.
					proj4.defs(WPSSRSname, projection);
					//Remove BoundedBy element.
					//var boundedby = coll.getElementsByTagName("gml:boundedBy");
					//boundedby[0].remove();
					var wfsformat = new ol.format.GML(options);
					// Parche para leer el GML del WPS de Geoserver.
					wfsformat.readFeaturesJP = function(node) {
						var features = [];
						if (node) {
							var childNodes = node.childNodes;
							for(var i=0; i<childNodes.length; i++) {
								if (childNodes[i].localName == 'featureMember') {
									var featureNode = childNodes[i].childNodes[0];
									var feature = this.readFeatures(childNodes[i]);
									if(feature) {
										features.push(feature);
									}	
								}
							}
						}
						return features;      
					};  
           			var features = wfsformat.readFeaturesJP(coll);
					//var features =wfsformat.readFeatures(coll);
					return Promise.resolve(features);
				});	
}

/**
* Write GML Feature collection members from an array of Feature
* @param {Array.<ol.Feature>} array of Features 
* @param {namespace}  namespace uri. i.e. "http://itastdevserver.tel.uva.es/ide2019b"
* @param {featuretype} name of the featuretype. i.e. "Aeropuertos3587"
* @param {string} a.
* @return string GML of the features
*/
function writeGMLFeatureMembers(features, prefix, namespace, featuretype, projection) {
	var options={
				srsName: projection.getCode(),
				featureProjection: projection,
				featureNS: namespace,
				featurePrefix: prefix,
				featureType: featuretype,
				multiSurface: false
				}
	// Hay que esperar a que terminen las anteriores.
	var format = new ol.format.GML3(options);
	//var gml = format.writeFeatures(featuresarray);

	var members = format.writeFeatures(features);
	return members;
}