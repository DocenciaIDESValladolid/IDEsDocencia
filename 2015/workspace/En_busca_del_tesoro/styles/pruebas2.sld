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
                    <PointSymbolizer>
                        <Geometry>
                            <PropertyName xmlns="http://www.opengis.net/ogc">geom</PropertyName>
                        </Geometry>
                        <Graphic>
                            <Mark>
                                <WellKnownName>CIRCLE</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Size>5</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
</FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>