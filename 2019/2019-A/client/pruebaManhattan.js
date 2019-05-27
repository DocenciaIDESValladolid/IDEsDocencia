var peticion = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
    <ows:Identifier>org.cnig.cartociudad.wps.ManhattanGenerator</ows:Identifier>
    <wps:DataInputs>
        <wps:Input>
            <ows:Identifier>punto</ows:Identifier>
    <wps:Data>
                <wps:ComplexData mimeType="text/xml">        
      <wfs:FeatureCollection xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sp="http://localhost/singlepoint" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://localhost http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/feature.xsd http://localhost:8080/wps/schemas/singlepoint.xsd">
        <gml:featureMembers>
          <sp:singlepoint gml:id="1">
            <sp:geom>
              <gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258">
                <gml:pos>-3.683274 40.43496</gml:pos>
              </gml:Point>
            </sp:geom>
          </sp:singlepoint>
        </gml:featureMembers>
      </wfs:FeatureCollection>
    </wps:ComplexData>
        </wps:Data>
        </wps:Input>
  <wps:Input>
    <ows:Identifier>radio</ows:Identifier>
    <wps:Data>
      <wps:LiteralData>3000.0</wps:LiteralData>
    </wps:Data>
  </wps:Input>
    </wps:DataInputs>
  <wps:ResponseForm>
    <wps:ResponseDocument>
      <wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
        <ows:Identifier>result</ows:Identifier>
      </wps:Output>
    </wps:ResponseDocument>
  </wps:ResponseForm>
</wps:Execute>`

fetch("http://www.cartociudad.es/wps/WebProcessingService", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: peticion
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					var posInicial = gml.search("<n52:GEOMETRY>");
					var posFinal = gml.search("</n52:GEOMETRY>");
					var bufferManhattan = gml.substring(posInicial,posFinal+15);
					console.log(bufferManhattan);
				});