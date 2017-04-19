function launchProcesses(markerinitial,markerfinal){
getRoute(markerinitial.lonlat.lat,markerinitial.lonlat.lon,markerfinal.lonlat.lat,markerfinal.lonlat.lon);

}


function response()
{
	var request=`<?xml version="1.0" encoding="UTF-8" ?>
<XLSversion="1.2"xmlns="http://www.opengis.net/xls"xmlns:gml="http://www.opengis.net/gml"xmlns:xls="http://www.opengis.net/xls"xmlns:xlsext="http://www.opengis.net/xlsext"xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"xsi:schemaLocation="http://www.opengis.net/xls http://schemas.opengis.net/ols/1.2/olsAll.xsd">
<ResponseHeader/>
<ResponserequestID="uid1464870468574_645"version="1.2">
<DetermineRouteResponse>
<RouteSummary>
<BoundingBox>
<gml:pos>50.638083 3.031317</gml:pos>
<gml:pos>50.639484 3.03408</gml:pos>
</BoundingBox>
<TotalTime>PT46.200S</TotalTime>
<TotalDistanceuom="KM"value="0.38079"/>
</RouteSummary>
<RouteGeometry>
<gml:LineString>
<gml:pos>50.639484 3.034062</gml:pos>
<gml:pos>50.639459 3.034080</gml:pos>
<gml:pos>50.639416 3.033930</gml:pos>
<gml:pos>50.639251 3.033362</gml:pos>
<gml:pos>50.639193 3.033207</gml:pos>
<gml:pos>50.639137 3.033101</gml:pos>
<gml:pos>50.639115 3.033043</gml:pos>
<gml:pos>50.638968 3.032774</gml:pos>
<gml:pos>50.638659 3.032229</gml:pos>
<gml:pos>50.638447 3.031859</gml:pos>
<gml:pos>50.638344 3.031694</gml:pos>
<gml:pos>50.638278 3.031598</gml:pos>
<gml:pos>50.638155 3.031419</gml:pos>
<gml:pos>50.638083 3.031317</gml:pos>
<gml:pos>50.638124 3.031475</gml:pos>
<gml:pos>50.638203 3.031661</gml:pos>
<gml:pos>50.638388 3.032049</gml:pos>
<gml:pos>50.638710 3.032625</gml:pos>
<gml:pos>50.638757 3.032738</gml:pos>
<gml:pos>50.638763 3.032731</gml:pos>
</gml:LineString>
</RouteGeometry>
<RouteInstructionsListlang="fr">
<RouteInstructionduration="PT30.870S">…</RouteInstruction>
<RouteInstructiondescription="BL"duration="PT15.330S">…</RouteInstruction>
</RouteInstructionsList>
</DetermineRouteResponse>
</Response>
</XLS>`;

var start=request.indexOf("<gml:LineString>");
var end=request.indexOf("</RouteGeometry>");
var geomGml=request.substr(start,end);
//add namespaces
var ns='xmlns:gml="http://www.opengis.net/gml" xmlns:sch="http://www.ascc.net/xml/schematron" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xs="http://www.w3.org/2001/XMLSchema" srsDimension="2"';
geomGml.replace('<gml:LineString','<gml:LineString '+ns);

var peticionWPS=`
<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>gs:IntersectionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:busapp="http://localhost:8080/geoserver/busapp">
            <wfs:Query typeName="busapp:pate"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">
        <wps:Body>
          <wps:Execute version="1.0.0" service="WPS">
            <ows:Identifier>gs:Feature</ows:Identifier>
            <wps:DataInputs>
              <wps:Input>
                <ows:Identifier>geometry</ows:Identifier>
                <wps:Reference mimeType="text/xml; subtype=gml/3.1.1" xlink:href="http://geoserver/wps" method="POST">
                  <wps:Body>
                    <wps:Execute version="1.0.0" service="WPS">
                      <ows:Identifier>geo:buffer</ows:Identifier>
                      <wps:DataInputs>
                        <wps:Input>
                          <ows:Identifier>geom</ows:Identifier>
                          <wps:Data>
                            <wps:ComplexData mimeType="text/xml; subtype=gml/3.1.1">
							${geomGml}
                            </wps:ComplexData>
                          </wps:Data>
                        </wps:Input>
                        <wps:Input>
                          <ows:Identifier>distance</ows:Identifier>
                          <wps:Data>
                            <wps:LiteralData>500</wps:LiteralData>
                          </wps:Data>
                        </wps:Input>
                      </wps:DataInputs>
                      <wps:ResponseForm>
                        <wps:RawDataOutput mimeType="text/xml; subtype=gml/3.1.1">
                          <ows:Identifier>result</ows:Identifier>
                        </wps:RawDataOutput>
                      </wps:ResponseForm>
                    </wps:Execute>
                  </wps:Body>
                </wps:Reference>
              </wps:Input>
              <wps:Input>
                <ows:Identifier>crs</ows:Identifier>
                <wps:Data>
                  <wps:LiteralData>EPSG:4326</wps:LiteralData>
                </wps:Data>
              </wps:Input>
			   <wps:Input>
      <ows:Identifier>typeName</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>buffer</wps:LiteralData>
      </wps:Data>
    </wps:Input>
            </wps:DataInputs>
            <wps:ResponseForm>
              <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
                <ows:Identifier>result</ows:Identifier>
              </wps:RawDataOutput>
            </wps:ResponseForm>
          </wps:Execute>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>first attributes to retain</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>poblacion18</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>intersectionMode</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>FIRST</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>percentagesEnabled</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>true</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;

var request = new OpenLayers.Request.POST({
        url: 'http://localhost/geoserver/wps',
        data: peticionWPS,
        headers: {
            "Content-Type": "text/xml;charset=utf-8"
        },
        async: true,
        callback: function (response) {
            //read the response from GeoServer
            var analysisLayer = readFeaturesFromWPSResponse(response.responseText);
			// feqtures debe tener una coleccion de features con las edificaciones intersectadas
		// bucle for para sumar poblacion18
			//procesar.....
			map.addLayer(analysisLayer);

			map.zoomToMaxExtent();

        },
        failure: function (response) {
            alert("Something went wrong in the request");
        }
    });




}
function processOLSResponse(response){
	
var start=response.indexOf("<gml:LineString>");
var end=response.indexOf("</RouteGeometry>");
var geomGml=response.substr(start,end-start);
//add namespaces
var ns='srsName="EPSG:4326" xmlns:gml="http://www.opengis.net/gml" xmlns:sch="http://www.ascc.net/xml/schematron" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xs="http://www.w3.org/2001/XMLSchema" srsDimension="2"';
geomGml=geomGml.replace('<gml:LineString','<gml:LineString '+ns);

var peticionWPS=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>gs:IntersectionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:busapp="http://localhost:8080/geoserver/busapp">
            <wfs:Query typeName="busapp:pate"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">
        <wps:Body>
          <wps:Execute version="1.0.0" service="WPS">
            <ows:Identifier>gs:Feature</ows:Identifier>
            <wps:DataInputs>
              <wps:Input>
                <ows:Identifier>geometry</ows:Identifier>
                <wps:Reference mimeType="text/xml; subtype=gml/3.1.1" xlink:href="http://geoserver/wps" method="POST">
                  <wps:Body>
                    <wps:Execute version="1.0.0" service="WPS">
                      <ows:Identifier>geo:buffer</ows:Identifier>
                      <wps:DataInputs>
                        <wps:Input>
                          <ows:Identifier>geom</ows:Identifier>
                          <wps:Data>
                            <wps:ComplexData mimeType="text/xml; subtype=gml/3.1.1">
							${geomGml}
                            </wps:ComplexData>
                          </wps:Data>
                        </wps:Input>
                        <wps:Input>
                          <ows:Identifier>distance</ows:Identifier>
                          <wps:Data>
                            <wps:LiteralData>500</wps:LiteralData>
                          </wps:Data>
                        </wps:Input>
                      </wps:DataInputs>
                      <wps:ResponseForm>
                        <wps:RawDataOutput mimeType="text/xml; subtype=gml/3.1.1">
                          <ows:Identifier>result</ows:Identifier>
                        </wps:RawDataOutput>
                      </wps:ResponseForm>
                    </wps:Execute>
                  </wps:Body>
                </wps:Reference>
              </wps:Input>
              <wps:Input>
                <ows:Identifier>crs</ows:Identifier>
                <wps:Data>
                  <wps:LiteralData>EPSG:4326</wps:LiteralData>
                </wps:Data>
              </wps:Input>
			   <wps:Input>
      <ows:Identifier>typeName</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>buffer</wps:LiteralData>
      </wps:Data>
    </wps:Input>
            </wps:DataInputs>
            <wps:ResponseForm>
              <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
                <ows:Identifier>result</ows:Identifier>
              </wps:RawDataOutput>
            </wps:ResponseForm>
          </wps:Execute>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>first attributes to retain</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>poblacion18</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>intersectionMode</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>FIRST</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>percentagesEnabled</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>true</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;

var request = new OpenLayers.Request.POST({
        url: 'http://localhost/geoserver/wps',
        data: peticionWPS,
        headers: {
            "Content-Type": "text/xml;charset=utf-8"
        },
        async: true,
        callback: function (response) {
            //read the response from GeoServer
            var analysisLayer = readFeaturesFromWPSResponse(response.responseText);
			// feqtures debe tener una coleccion de features con las edificaciones intersectadas
		// bucle for para sumar poblacion18
			//procesar.....
			map.addLayer(analysisLayer);
			
			map.zoomToMaxExtent();

        },
        failure: function (response) {
            alert("Something went wrong in the request");
        }
    });


}
function getRoute(latinit,loninit,lat,lon){
var requestRoute=`<?xml version="1.0" encoding="UTF-8"?>
<xls:XLS xmlns:xls="http://www.opengis.net/xls"
xmlns:gml="http://www.opengis.net/gml"
xmlns:sch="http://www.ascc.net/xml/schematron"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.opengis.net/xls http://schemas.opengis.net/ols/1.1.0/RouteService.xsd"
xmlns:xlsext="http://www.opengis.net/xlsext" version="1.2" xls:lang="fr">
<xls:RequestHeader />
<xls:Request maximumResponses="10" methodName="RouteRequest" requestID="uid1460559761783_519" version="1.2">
<xls:DetermineRouteRequest distanceUnit="KM">
	<xls:RoutePlan>
		<xlsext:GraphName>Voiture</xlsext:GraphName>
        	<xls:RoutePreference>Fastest</xls:RoutePreference>
            <xls:WayPointList>
            	<xls:StartPoint>
                	<xls:Position>
                		<gml:Point srsName="EPSG:4326"><gml:pos>${latinit} ${loninit}</gml:pos></gml:Point>
                    </xls:Position>
                </xls:StartPoint>
                <xls:EndPoint>
                	<xls:Position>
                        <gml:Point srsName="EPSG:4326"><gml:pos>${lat} ${lon}</gml:pos></gml:Point>
                    </xls:Position>
                </xls:EndPoint>
            </xls:WayPointList>
    </xls:RoutePlan>
	<xls:RouteInstructionsRequest provideGeometry="true"/>
</xls:DetermineRouteRequest>
<xls:RouteGeometryRequest/></xls:Request></xls:XLS>`

var olsserver='http://wxs.ign.fr/yvmoikafaddadzmxvh6sdmjb/itineraire/ols';
var olsserver='http://localhost/ols';

var request = new OpenLayers.Request.POST({
       	
        url: olsserver,
        data: requestRoute,
        headers: {
            "Content-Type": "text/xml;charset=utf-8"
        },
        async: true,
        callback: function (response) {

            //read the response from GeoServer
            processOLSResponse(response.responseText);

        },
        failure: function (response) {
            alert("Something went wrong in the request");
        }

    });

}
function getAnalysisFeatures(features){

var format= new OpenLayers.Format.GML();
/* featColl tiene que tener este formato:

   <wfs:FeatureCollection xmlns:wfs="http://www.opengis.net/wfs" xmlns:feature="http://www.opengis.net/gml" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xs="http://www.w3.org/2001/XMLSchema">
            <gml:boundedBy>
              <gml:Box srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
                <gml:coord>
                  <gml:X>0.0</gml:X>
                  <gml:Y>0.0</gml:Y>
                </gml:coord>
                <gml:coord>
                  <gml:X>0.0</gml:X>
                  <gml:Y>0.0</gml:Y>
                </gml:coord>
              </gml:Box>
            </gml:boundedBy>
            <gml:featureMember>
              <gml:punto fid="fid-6e2227b_1550c7e8f94_-8000">
                <gml:boundedBy>
                  <gml:Box srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
                    <gml:coord>
                      <gml:X>0.0</gml:X>
                      <gml:Y>0.0</gml:Y>
                    </gml:coord>
                    <gml:coord>
                      <gml:X>0.0</gml:X>
                      <gml:Y>0.0</gml:Y>
                    </gml:coord>
                  </gml:Box>
                </gml:boundedBy>
                <gml:geom>
                  <gml:Point>
                    <gml:coord>
                      <gml:X>0.0</gml:X>
                      <gml:Y>0.0</gml:Y>
                    </gml:coord>
                  </gml:Point>
                </gml:geom>
              </gml:punto>
            </gml:featureMember>
          </wfs:FeatureCollection>
*/
var featColl= format.write(features);

var requestWps=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>gs:IntersectionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">
        <wps:Body>
          <wps:Execute version="1.0.0" service="WPS">
            <ows:Identifier>gs:BufferFeatureCollection</ows:Identifier>
            <wps:DataInputs>
              <wps:Input>
                <ows:Identifier>features</ows:Identifier>
                 <wps:Data>
        <wps:ComplexData mimeType="text/xml; subtype=wfs-collection/1.1">
       ${featColl}
        </wps:ComplexData>
      </wps:Data>
              </wps:Input>
              <wps:Input>
                <ows:Identifier>distance</ows:Identifier>
                <wps:Data>
                  <wps:LiteralData>500</wps:LiteralData>
                </wps:Data>
              </wps:Input>
            </wps:DataInputs>
            <wps:ResponseForm>
              <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
                <ows:Identifier>result</ows:Identifier>
              </wps:RawDataOutput>
            </wps:ResponseForm>
          </wps:Execute>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:ide="http://localhost:8080/geoserver/busapp">
            <wfs:Query typeName="busapp:pate"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second attributes to retain</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>poblacion18</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>intersectionMode</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>SECOND</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>percentagesEnabled</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>true</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;

var request = new OpenLayers.Request.POST({
        url: 'http://localhost/geoserver/wps',
        data: requestWps,
        headers: {
            "Content-Type": "text/xml;charset=utf-8"
        },
        async: true,
        callback: function (response) {
            //read the response from GeoServer
            var analysisLayer = readFeaturesFromWPSResponse(response.responseText);
			// feqtures debe tener una coleccion de features con las edificaciones intersectadas

			//procesar.....
			map.addLayer(analysisLayer);
			map.zoomToMaxExtent();

        },
        failure: function (response) {
            alert("Something went wrong in the request");
        }
    });


	}
function readFeaturesFromWPSResponse(response){
var cleaned= response.replace(/<gml\:posList/g,'<gml:posList dimension="2"');
var gml=new OpenLayers.Format.GML();
// Parche para que se pueda buscar en Features que no sean del espacio de nombres gmlns
gml.read = function (data){
        if(typeof data == "string") {
            data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        }
        var featureMembers = this.getElementsByTagNameNS(data.documentElement,this.gmlns,"featureMembers");
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
