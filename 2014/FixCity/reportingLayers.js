function createWFSLayer()
{
	//var options= getDenunciasConfig();
	var options= getDenunciasConfigAnimCluster();		
	var wfs = new OpenLayers.Layer.Vector("Denuncias", 
		{
		strategies: options.strategies,
        protocol: new OpenLayers.Protocol.WFS(
			{
            url: "http://itastdevserver.tel.uva.es/geoserver/IDEs/ows",
            featureType: "denuncias_image",
            featureNS: "http://www.idelab.uva.es/#IDES",
			srsName: "EPSG:3857",
			version: "1.1.0"
			}),
		styleMap: options.styleMap,
		});
	return wfs;
}
function createHeatmapLayer()
{
var wms_concentracion = new OpenLayers.Layer.WMS("Concentración de denuncias",
        "http://itastdevserver.tel.uva.es/geoserver/IDEs/ows",
        {layers: 'IDEs:denuncias_antig',transparent:true, styles:'heatmap'},
        {isBaseLayer: false, singleTile:true, visibility:false}
    );
return wms_concentracion;
}

function getDenunciasConfig()
	{
	  var denunciasStyleCluster = new OpenLayers.Style({
                   
                    externalGraphic: "images/cono.png",
					graphicOpacity: 1.0,
					graphicWidth: "${radius}",
					graphicHeight: "${radius}",
					graphicYOffset: "-${radius}"
                }, {
                    context: {
                        radius: function(feature) {
                            return Math.min(Math.max(48,feature.attributes.count*10+ 48-10), 96);
                        }
                    }
                });
	var denunciasStyle = new OpenLayers.Style({
                    externalGraphic: "images/cono.png",
					graphicOpacity: 1.0,
					graphicWidth: 48,
					graphicHeight: 48,
					graphicYOffset: -48
                });
	var strategies = [new OpenLayers.Strategy.BBOX({resFactor: 1}), 
			//new OpenLayers.Strategy.Cluster()
			];
	var	styleMap= new OpenLayers.StyleMap({
			"default": denunciasStyle,
            /*externalGraphic: "images/cono.png",
            graphicOpacity: 1.0,
            graphicWidth: 48,
            graphicHeight: 48,
            graphicYOffset: -48*/
			});
		return { 'styleMap':styleMap, 'strategies':strategies };	
	}
	function getDenunciasConfigAnimCluster()
	{
/*	var animCluster= new OpenLayers.Strategy.AnimatedCluster({
            distance: 20,
            animationMethod: OpenLayers.Easing.Expo.easeOut,
            animationDuration: 10
        });*/
	var animCluster=new OpenLayers.Strategy.Cluster({
            distance: 40,threshold:2,
        });
	var strategies = [ new OpenLayers.Strategy.BBOX({resFactor: 1}),animCluster];
	// Define three colors that will be used to style the cluster features
            // depending on the number of features they contain.
            var colors = {
                low: "rgb(181, 226, 140)", 
                middle: "rgb(241, 211, 87)", 
                high: "rgb(253, 156, 115)"
            };
			
             var photoRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Logical({
						type: OpenLayers.Filter.Logical.NOT,
						filters: [
						new OpenLayers.Filter.Comparison({
									type: OpenLayers.Filter.Comparison.IS_NULL,
									property: "img"})
								]})	,
				symbolizer: {
					externalGraphic:"${img}",//"images/cono.png",
					graphicWidth: 48,
					graphicHeight: 48,
					graphicOpacity: 1.0,
				}
            });
			var conoRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Logical({
						type: OpenLayers.Filter.Logical.NOT,
						filters: [
						new OpenLayers.Filter.Comparison({
									type: OpenLayers.Filter.Comparison.IS_NULL,
									property: "id_denuncia"})
								]})	,
				symbolizer: {
					externalGraphic:"images/cono.png",
					graphicWidth: 48,
					graphicHeight: 48,
					graphicOpacity: 1.0,
				}
            });
            // Define three rules to style the cluster features.
            var lowRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.LESS_THAN,
                    property: "count",
                    value: 2
                }),
                symbolizer: {
					externalGraphic:"${img}",//"images/cono.png",
					graphicWidth: 48,
					graphicHeight: 48,
					graphicOpacity: 1.0,
                }
            });
            var middleRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.BETWEEN,
                    property: "count",
                    lowerBoundary: 2,
                    upperBoundary: 25
                }),
                symbolizer: {
					externalGraphic: "images/cono.png",
					graphicOpacity: 1.0,
					graphicWidth: 48,
					graphicHeight: 48,
                    fillColor: colors.middle,
                    fillOpacity: 1, 
                    strokeColor: colors.middle,
                    strokeOpacity: 1,
                    strokeWidth: 12,
                    pointRadius: 15,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#000000",
                    fontOpacity: 1,
                    fontSize: "20px"
                }
            });
            var highRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "count",
                    value: 25
                }),
                symbolizer: {
					externalGraphic: "images/cono.png",
					graphicWidth: 48,
					graphicHeight: 48,
					graphicOpacity: 1.0,
                    fillColor: colors.high,
                    fillOpacity: 1, 
                    strokeColor: colors.high,
                    strokeOpacity: 1,
                    strokeWidth: 12,
                    pointRadius: 20,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#00000",
                    fontOpacity: 1,
                    fontSize: "20px"
                }
            });
            
            // Create a Style that uses the three previous rules
            var style = new OpenLayers.Style(null, {
                rules: [photoRule, lowRule, middleRule, highRule]
            }); 
			var	styleMap= new OpenLayers.StyleMap({
			"default": style,
            /*externalGraphic: "images/cono.png",
            graphicOpacity: 1.0,
            graphicWidth: 48,
            graphicHeight: 48,
            graphicYOffset: -48*/
			});
			return { 'styleMap':styleMap, 'strategies':strategies };
		}