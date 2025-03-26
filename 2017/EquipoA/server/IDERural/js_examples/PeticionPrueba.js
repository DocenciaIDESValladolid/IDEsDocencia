 function PruebaPeticion (punto){
        var response ='<?xml version="1.0" encoding="UTF-8"?>\n\
                <ns:ExecuteResponse xmlns:ns="http://www.opengis.net/wps/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd" serviceInstance="http://localhost:8080/wps/WebProcessingService?REQUEST=GetCapabilities&amp;SERVICE=WPS" xml:lang="en-US" service="WPS" version="1.0.0"><ns:Process ns:processVersion="1.1.0"><ns1:Identifier xmlns:ns1="http://www.opengis.net/ows/1.1">org.cnig.cartociudad.wps.RouteFinder</ns1:Identifier><ns1:Title xmlns:ns1="http://www.opengis.net/ows/1.1">RouteFinder</ns1:Title></ns:Process><ns:Status creationTime="2016-05-20T15:47:27.096+02:00"><ns:ProcessSucceeded>Process successful</ns:ProcessSucceeded></ns:Status><ns:ProcessOutputs><ns:Output><ns1:Identifier xmlns:ns1="http://www.opengis.net/ows/1.1">routeResult</ns1:Identifier><ns1:Title xmlns:ns1="http://www.opengis.net/ows/1.1">Ruta completa</ns1:Title><ns:Data>\n\
                <ns:ComplexData schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" encoding="UTF-8" mimeType="text/xml"><gml:FeatureCollection xmlns:gml="http://www.opengis.net/gml" xmlns:n52="http://www.52north.org/fbf1fd13-6432-41dd-ada7-3a7a5bf673b6" xsi:schemaLocation="http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/feature.xsd http://www.52north.org/fbf1fd13-6432-41dd-ada7-3a7a5bf673b6 http://localhost:8080/wps/schemas/fbf1fd13-6432-41dd-ada7-3a7a5bf673b6.xsd"><gml:featureMembers><n52:Feature-fbf1fd13-6432-41dd-ada7-3a7a5bf673b6 gml:id="ID0"><gml:boundedBy><gml:Envelope srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258"><gml:lowerCorner>-3.87424 40.32745</gml:lowerCorner><gml:upperCorner>-3.86762 40.32965</gml:upperCorner></gml:Envelope></gml:boundedBy><n52:GEOMETRY><gml:MultiCurve srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258"><gml:curveMember><gml:LineString srsDimension="2"><gml:posList>-3.87424 40.32965 -3.874 40.32918 -3.87395 40.32908 -3.87359 40.32838 -3.87347 40.32841 -3.87201 40.32892 -3.87191 40.32894 -3.87182 40.32893 -3.87172 40.32888 -3.87078 40.32775 -3.86997 40.32788 -3.86983 40.32745 -3.8694 40.3276 -3.86903 40.32769 -3.86836 40.32787 -3.86793 40.32798 -3.86762 40.32807</gml:posList></gml:LineString></gml:curveMember></gml:MultiCurve></n52:GEOMETRY><n52:from>40.3296855748486,-3.8741284950823998</n52:from><n52:to>40.3282382910204,-3.86769495662188</n52:to><n52:time>95443</n52:time><n52:distance>795.3858253466093</n52:distance></n52:Feature-fbf1fd13-6432-41dd-ada7-3a7a5bf673b6></gml:featureMembers></gml:FeatureCollection></ns:ComplexData></ns:Data></ns:Output></ns:ProcessOutputs></ns:ExecuteResponse>';
        
       //Cuerpo de la petcicion en partes para añadir los parametros de la funcion en este caso el punto elegido
        var aux='<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>gs:IntersectionFeatureCollection</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>first feature collection</ows:Identifier><wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="http://localhost:8081/geoserver/wps" method="POST"><wps:Body><![CDATA[<wps:Execute version="1.1.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>gs:Simplify</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="http://localhost:8081/geoserver/wfs" method="POST"><wps:Body><![CDATA[<wfs:GetFeature service="WFS" version="1.1.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="p_casas_rurales:provincias"><Filter><Intersects><PropertyName>the_geom</PropertyName><gml:Point srsName="EPSG:4258"><gml:coordinates>';
        var aux1='</gml:coordinates></gml:Point></Intersects></Filter></wfs:Query></wfs:GetFeature>]]]]><![CDATA[></wps:Body></wps:Reference></wps:Input><wps:Input><ows:Identifier>distance</ows:Identifier><wps:Data><wps:LiteralData>0.01</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>preserveTopology</ows:Identifier><wps:Data><wps:LiteralData>True</wps:LiteralData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>]]></wps:Body></wps:Reference></wps:Input><wps:Input><ows:Identifier>second feature collection</ows:Identifier><wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST"><wps:Body><wfs:GetFeature service="WFS" version="1.1.0" outputFormat="GML2" xmlns:p_casas_rurales="p_casas_rurales"><wfs:Query typeName="p_casas_rurales:zonas_the_geom"/></wfs:GetFeature></wps:Body></wps:Reference></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>';
        var wpsRequestData=aux+punto+aux1; 
        
        var request = new OpenLayers.Request.POST({
                url: 'http://localhost/wps', //ESTA URL? o localhost/geoserver/wps
                data: wpsRequestData,
                headers: {
                    "Content-Type": "text/xml;charset=utf-8"
                },
                async: true,
                callback: function (response) {
                    //read the response from GeoServer
                                console.log(response.responseText);
                    var features = readFeaturesFromWPSResponse(response.responseText,'http://www.52north.org/fbf1fd13-6432-41dd-ada7-3a7a5bf673b6','Feature-fbf1fd13-6432-41dd-ada7-3a7a5bf673b6');
                                console.log(features.length+ " Features decoded.");
                    
                    //dibujamos los datos obtenidos en un mapa  
                    var ProvinciaStyle=  new OpenLayers.Style({                            
                            fillColor: "#00ff00",
                            strokeColor: "#00ff00",
                            strokeWidth: 5,
                            graphicZIndex: 1
                        });
                  
                    var vectorLayer = new OpenLayers.Layer.Vector("Provincia seleccionada",{styleMap:ProvinciaStyle});                    
                    map.addLayer (vectorLayer);                 
                         
                },
                failure: function (response) {
                    alert("Something went wrong in the request");
                }
            });

    }
    //respuesta del wps de cartociudad, NO ENTIENDO LAS VARIABLES DE ESTA FUNCIÓN
    function readFeaturesFromWPSResponse(response,featureNSUri,featureName){
            var cleaned= response.replace(/<gml\:posList/g,'<gml:posList dimension="2"');
            var gml=new OpenLayers.Format.GML({uri:featureNSUri,
                                            featureName:featureName});
    // Parche para que se pueda buscar en Features que no sean del espacio de nombres gmlns        				
            gml.read = function (data){
            if(typeof data == "string") { 
                data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
            }
            var featureMembers = this.getElementsByTagNameNS(data.documentElement,this.gmlns,"featureMembers");

            /*var featureNodes = this.getElementsByTagNameNS(data.documentElement,
                                                           this.uri,
                                                          this.featureName);*/

            var featureNodes = featureMembers[0].childNodes;
            var features = [];
            for(var i=0; i<featureNodes.length; i++) {
                var feature = this.parseFeature(featureNodes[i]);
                if(feature) {
                    features.push(feature);
                }
            }            
            return features;
        };
        return gml.read(cleaned);
    }