<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
 xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
 xmlns="http://www.opengis.net/sld" 
 xmlns:ogc="http://www.opengis.net/ogc" 
 xmlns:xlink="http://www.w3.org/1999/xlink" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <!-- a Named Layer is the basic building block of an SLD document -->
  <NamedLayer>
    <Name>default_polygon</Name>
    <UserStyle>
    <!-- Styles can have names, titles and abstracts -->
      <Title>Default Polygon</Title>
      <Abstract>A sample style that draws a polygon</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- A FeatureTypeStyle for rendering polygons -->
      <FeatureTypeStyle>
     <Rule>
       <MaxScaleDenominator>50000</MaxScaleDenominator>
        <PointSymbolizer>
            <Graphic>
                <Mark>
                    <WellKnownName>circle</WellKnownName>
                    <Fill>
           <CssParameter name="fill">#000080</CssParameter>
           <CssParameter name="fill-opacity">0.9</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">1</CssParameter>
         </Stroke>
                </Mark>
                <Size>9</Size>
            </Graphic>
        </PointSymbolizer>
    </Rule>
             <Rule>
       <MaxScaleDenominator>500000</MaxScaleDenominator>
       <MinScaleDenominator>50000</MinScaleDenominator>
        <PointSymbolizer>
            <Graphic>
                <Mark>
                    <WellKnownName>circle</WellKnownName>
                    <Fill>
           <CssParameter name="fill">#000080</CssParameter>
           <CssParameter name="fill-opacity">0.9</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">1</CssParameter>
         </Stroke>
                </Mark>
                <Size>7</Size>
            </Graphic>
        </PointSymbolizer>
    </Rule>
        <Rule>
       <MinScaleDenominator>500000</MinScaleDenominator>
        <PointSymbolizer>
            <Graphic>
                <Mark>
                    <WellKnownName>circle</WellKnownName>
                    <Fill>
           <CssParameter name="fill">#000080</CssParameter>
           <CssParameter name="fill-opacity">0.9</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">1</CssParameter>
         </Stroke>
                </Mark>
                <Size>5</Size>
            </Graphic>
        </PointSymbolizer>
    </Rule>
    <Rule>
       <ogc:Filter>
         <ogc:PropertyIsLessThan>
           <ogc:PropertyName>finished</ogc:PropertyName>
           <ogc:Literal>1</ogc:Literal>
         </ogc:PropertyIsLessThan>
       </ogc:Filter>
      <PointSymbolizer>
            <Graphic>
                <Mark>
                    <WellKnownName>circle</WellKnownName>
                    <Fill>
           <CssParameter name="fill">#FF0000</CssParameter>
           <CssParameter name="fill-opacity">0.9</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">1</CssParameter>
         </Stroke>
                </Mark>
                <Size>13</Size>
            </Graphic>
        </PointSymbolizer>
     </Rule>
</FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>