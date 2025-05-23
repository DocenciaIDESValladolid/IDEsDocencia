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
       <Name>Large</Name>
       <MaxScaleDenominator>100000000</MaxScaleDenominator>
       <PolygonSymbolizer>
         <Fill>
           <CssParameter name="fill">#0000CC</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">7</CssParameter>
         </Stroke>
       </PolygonSymbolizer>
     
     </Rule>
     <Rule>
       <Name>Medium</Name>
       <MinScaleDenominator>100000000</MinScaleDenominator>
       <MaxScaleDenominator>200000000</MaxScaleDenominator>
       <PolygonSymbolizer>
         <Fill>
           <CssParameter name="fill">#0000CC</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">4</CssParameter>
         </Stroke>
       </PolygonSymbolizer>
     </Rule>
     <Rule>
       <Name>Small</Name>
       <MinScaleDenominator>200000000</MinScaleDenominator>
       <PolygonSymbolizer>
         <Fill>
           <CssParameter name="fill">#0000CC</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">1</CssParameter>
         </Stroke>
       </PolygonSymbolizer>
     </Rule>
   </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>