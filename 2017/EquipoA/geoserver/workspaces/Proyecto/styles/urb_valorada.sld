<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <NamedLayer>
    <Name>heatmap-suelo-urbanizable</Name>
    <UserStyle>
      <Title>Mapa de calor con la valoracion del suelo</Title>
      <FeatureTypeStyle>
        <Rule>
          <Title>heatmap-urbanizable</Title>
          <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">
                 <ogc:Function name="Interpolate">
                   <!-- Property to transform -->
                   <ogc:PropertyName>distancia</ogc:PropertyName>

                   <!-- Mapping curve definition pairs (input, output) -->
                   <ogc:Literal>0</ogc:Literal>
                   <ogc:Literal>#FFFFFF</ogc:Literal>

                   <ogc:Literal>5</ogc:Literal>
                   <ogc:Literal>#1a6aef</ogc:Literal>

                   <ogc:Literal>10</ogc:Literal>
                   <ogc:Literal>#001538</ogc:Literal>
                   
                   <ogc:Literal>11</ogc:Literal>
                   <ogc:Literal>#09b500</ogc:Literal>

                   <!-- Interpolation method -->
                   <ogc:Literal>color</ogc:Literal>

                   <!-- Interpolation mode - defaults to linear -->
                 </ogc:Function>
               </CssParameter>
   			  </Fill>
			</PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>