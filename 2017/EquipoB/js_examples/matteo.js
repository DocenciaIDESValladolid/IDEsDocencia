function tst(){
    var dWithin = `
        <wfs:GetFeature service="WFS" version="1.0.0"
          outputFormat="GML2"
          xmlns:wfs="http://www.opengis.net/wfs"
          xmlns:ogc="http://www.opengis.net/ogc"
          xmlns:gml="http://www.opengis.net/gml"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.opengis.net/wfs
                              http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">
          <wfs:Query typeName="semana6:Deaths">
            <ogc:Filter>
              <ogc:DWithin>
                    <ogc:PropertyName>the_geom</ogc:PropertyName>
                    <Literal>
                      <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#27700">
                        <gml:coordinates xmlns:gml="http://www.opengis.net/gml">529192.53786754,181079.391379652</gml:coordinates>
                      </gml:Point>
                    </Literal>
                    <ogc:Distance unit="meters">100</ogc:Distance>
            </ogc:DWithin>
            </ogc:Filter>
            </wfs:Query>
        </wfs:GetFeature>`;
  
    var request = new OpenLayers.Request.POST({
            url: 'http://localhost:8080/geoserver/wfs',
            data: dWithin,
            headers: {"Content-Type": "text/xml;charset=utf-8"},
            async: true,
            callback: function(response){
                //read the response from GeoServer
                console.log(response.responseText);
                var analysisLayer = readFeaturesFromWPSResponse(response.responseText);
                map.addLayer(analysisLayer);
            },
            failure: function(response){
                console.log("there is a problem with request");
          }
      });
}