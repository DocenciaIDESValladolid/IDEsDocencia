<?xml version="1.0" encoding="ISO-8859-1"?>
   <StyledLayerDescriptor version="1.0.0"
       xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
       xmlns="http://www.opengis.net/sld"
       xmlns:ogc="http://www.opengis.net/ogc"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <NamedLayer>
       <Name>Heatmap</Name>
       <UserStyle>
         <Title>Heatmap</Title>
         <Abstract>A heatmap surface showing population density</Abstract>
         <FeatureTypeStyle>
           <Transformation>
             <ogc:Function name="gs:Heatmap">
               <ogc:Function name="parameter">
                 <ogc:Literal>data</ogc:Literal>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>weightAttr</ogc:Literal>
                 <ogc:Literal>pop_max</ogc:Literal>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>radiusPixels</ogc:Literal>
                 <ogc:Function name="env">
                   <ogc:Literal>radius</ogc:Literal>
                   <ogc:Literal>50</ogc:Literal>
                 </ogc:Function>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>pixelsPerCell</ogc:Literal>
                 <ogc:Literal>10</ogc:Literal>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>outputBBOX</ogc:Literal>
                 <ogc:Function name="env">
                   <ogc:Literal>wms_bbox</ogc:Literal>
                 </ogc:Function>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>outputWidth</ogc:Literal>
                 <ogc:Function name="env">
                   <ogc:Literal>wms_width</ogc:Literal>
                 </ogc:Function>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>outputHeight</ogc:Literal>
                 <ogc:Function name="env">
                   <ogc:Literal>wms_height</ogc:Literal>
                 </ogc:Function>
               </ogc:Function>
             </ogc:Function>
           </Transformation>
           <Rule>
             <RasterSymbolizer>
             <!-- specify geometry attribute of input to pass validation -->
               <Geometry><ogc:PropertyName>locations</ogc:PropertyName></Geometry>
               <Opacity>0.6</Opacity>
               <ColorMap type="ramp" >
                 <ColorMapEntry color="#FFFFFF" quantity="0" label="nodata" opacity="0"/>
                 <ColorMapEntry color="#FFFFFF" quantity="0.02" label="nodata" opacity="0"/>
                 <ColorMapEntry color="#4444FF" quantity=".1" label="baja densidad de población"/>
                 <ColorMapEntry color="#FF0000" quantity=".5" label="media densidad de población" />
                 <ColorMapEntry color="#FFFF00" quantity="1.0" label="alta densidad de población" />
               </ColorMap>
             </RasterSymbolizer>
           </Rule>
         </FeatureTypeStyle>
       </UserStyle>
     </NamedLayer>
    </StyledLayerDescriptor>