colorMenosCumplidores = new Array(10);
colorMenosCumplidores[0] = '#660000'; //Rojos Oscuros a Naranjas
colorMenosCumplidores[1]= '#990000';  
colorMenosCumplidores[2]= '#cc0000';  
colorMenosCumplidores[3]= '#ff0000'; 
colorMenosCumplidores[4]= '#ff3300';  
colorMenosCumplidores[5]= '#cc33ff'; 
colorMenosCumplidores[6]= '#ff6600'; 
colorMenosCumplidores[7]= '#cc6600'; 
colorMenosCumplidores[8]= '#ff9900'; 
colorMenosCumplidores[9]= '#ffcc00';

colorMasCumplidores = new Array(10);
colorMasCumplidores[0]= '#0000ff'; //Azules Oscuros a Verdes
colorMasCumplidores[1]= '#0033ff';  
colorMasCumplidores[2]= '#0066ff';  
colorMasCumplidores[3]= '#0099ff'; 
colorMasCumplidores[4]= '#00ccff';  
colorMasCumplidores[5]= '#00ffff'; 
colorMasCumplidores[6]= '#66ff00'; 
colorMasCumplidores[7]= '#00ff99'; 
colorMasCumplidores[8]= '#33ff66'; 
colorMasCumplidores[9]= '#00ff33';

function addThematicUALayers(arrayMun, n)
{
	if (n==0) {var sld=generateCustomUASld('nationalcode',arrayMun,colorMasCumplidores);}
	if (n==1) {var sld=generateCustomUASld('nationalcode',arrayMun,colorMenosCumplidores);}
	
	var wms_UA = new OpenLayers.Layer.WMS("Menos cumplidores",
        urlWmsUA,
        {	
		//layers: 'AU.AdministrativeUnit',
			transparent:true,
			sld_body: sld,
			version: "1.1.0"
		},
        {isBaseLayer: false, singleTile:true, tileOptions: {maxGetUrlLength: 2048}, visibility:false}
    );
	wms_UA.id='thematicUA';
	return wms_UA;
}
function updateThematicUALayer(property, values, colors)
{
var layer= map.getLayer('thematicUA');
var sld=generateCustomUASld(property,values,colors);
layer.params.SLD_BODY = sld;
layer.redraw();
}
function generateCustomUASld(attribute,codes,colors)
	{
	
	 var sld = '<?xml version="1.0" encoding="utf-8"?>';
				sld+='<StyledLayerDescriptor version="1.0.0">';
                sld+= '<NamedLayer>';
                sld+= '<Name>AU.AdministrativeUnit</Name>';
                sld+= '<UserStyle>';
                sld+= '<IsDefault>1</IsDefault>';
                sld+= '<FeatureTypeStyle>';
				
	for (i=0;i<codes.length;i++)			
		{		
                sld+= '<Rule>';
				sld+= '<Filter>';
				sld+= '<And>';
				sld+= '<PropertyIsGreaterThanOrEqualTo><PropertyName>nationallevel</PropertyName><Literal>'+(provlevel+1)+'</Literal></PropertyIsGreaterThanOrEqualTo>';
				sld+= '<PropertyIsEqualTo><PropertyName>'+attribute+'</PropertyName><Literal>'+codes[i]+'</Literal></PropertyIsEqualTo>';
				sld+= '</And>';
				sld+= '</Filter>';
         /*       sld+= '<LineSymbolizer>';
                sld+= '<Stroke>';
                sld+= '<CssParameter name="stroke">';
                sld+= '<Literal>#780000</Literal>';
                sld+= '</CssParameter>';
                sld+= '<CssParameter name="stroke-width">';
                sld+= '<Literal>2</Literal>';
                sld+= '</CssParameter>';
                sld+= '</Stroke>';
                sld+= '</LineSymbolizer>';*/
				sld+= '<PolygonSymbolizer>';
                sld+= '<Fill>';
                sld+= '<CssParameter name="fill">';
                sld+= '<Literal>'+colors[i]+'</Literal>';
                sld+= '</CssParameter>';
				sld+= '<CssParameter name="fill-opacity">0.5</CssParameter>';
                sld+= '</Fill>';
                sld+= '</PolygonSymbolizer>';
				sld+= '<TextSymbolizer><Label><PropertyName>nameunit</PropertyName></Label>';
				sld+= ' <Font><CssParameter name="font-family">Arial</CssParameter><CssParameter name="font-size">12</CssParameter>';
				sld+= '<CssParameter name="font-style">normal</CssParameter><CssParameter name="font-weight">bold</CssParameter></Font>';
				sld+= '</TextSymbolizer>';
                sld+= '</Rule>';	
		}
                sld+= '</FeatureTypeStyle>';
                sld+= '</UserStyle>';
                sld+= '</NamedLayer>';

                sld+= '</StyledLayerDescriptor>';
	return sld;
	}