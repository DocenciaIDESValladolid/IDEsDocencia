<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
 xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
 xmlns="http://www.opengis.net/sld" 
 xmlns:ogc="http://www.opengis.net/ogc" 
 xmlns:xlink="http://www.w3.org/1999/xlink" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>poligonos_provincia</Name>
    <UserStyle>
      <Title>Provincias España</Title>
      <Abstract>Provincias en blanco con el nombre dentro</Abstract>
      <FeatureTypeStyle>
        <Rule>          
          <Name>Provincias</Name>
          <Title>Poligono blanco con nombre</Title>
          <Abstract>Poligono blanco con el nombre interior</Abstract>
          <MaxScaleDenominator>5000000</MaxScaleDenominator>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
            <TextSymbolizer>
     			<Label>
       				<ogc:PropertyName>texto</ogc:PropertyName>
     			</Label>
                <Font>
           			<CssParameter name="font-family">Arial</CssParameter>
           			<CssParameter name="font-size">14</CssParameter>
           			<CssParameter name="font-style">normal</CssParameter>
         		</Font>
                <LabelPlacement>
                  <PointPlacement>
                      <AnchorPoint>
                          <AnchorPointX>0.5</AnchorPointX>
                          <AnchorPointY>0.0</AnchorPointY>
                      </AnchorPoint>
                      <Displacement>
                          <DisplacementX>0</DisplacementX>
                          <DisplacementY>0</DisplacementY>
                      </Displacement>             		
                  </PointPlacement>
         		</LabelPlacement>
     			<Fill>
       				<CssParameter name="fill">#000000</CssParameter>
     			</Fill>
   			</TextSymbolizer>
        </Rule>
        <Rule>          
          <Name>Provincias</Name>
          <Title>Poligono blanco con nombre</Title>
          <Abstract>Poligono blanco con el nombre interior</Abstract>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
          </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
