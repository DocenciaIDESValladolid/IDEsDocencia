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
       <PolygonSymbolizer>
         <Fill>
           <CssParameter name="fill">#000080</CssParameter>
           <CssParameter name="fill-opacity">0.5</CssParameter>
         </Fill>
         <Stroke>
           <CssParameter name="stroke">#000000</CssParameter>
           <CssParameter name="stroke-width">1</CssParameter>
         </Stroke>
       </PolygonSymbolizer>
      <TextSymbolizer>
         <Label>
           <ogc:PropertyName>num_riddle</ogc:PropertyName>
         </Label>
         <Font>
           <CssParameter name="font-family">Arial</CssParameter>
           <CssParameter name="font-size">11</CssParameter>
           <CssParameter name="font-style">normal</CssParameter>
           <CssParameter name="font-weight">bold</CssParameter>
        </Font>
        <Halo>
           <Radius>3</Radius>
           <Fill>
             <CssParameter name="fill">#FFFFFF</CssParameter>
           </Fill>
        </Halo>
       </TextSymbolizer>
    </Rule>
</FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>