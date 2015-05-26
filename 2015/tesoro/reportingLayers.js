function createWFSLayer()
{
	//var options= getDenunciasConfig();
	var options= getEscenariosConfigAnimCluster();		
	var wfs = new OpenLayers.Layer.Vector("Escenarios Iniciales", 
		{
		strategies: options.strategies,
        protocol: new OpenLayers.Protocol.WFS(
			{
            url: "http://localhost/geoserver/En_busca_del_tesoro/wfs",
            featureType: "puntos_iniciales",
            featureNS: "http://localhost:8080/geoserver/busqueda_tesoro",
            srsName: "EPSG:900913",
            version: "1.1.0"
			}),
		styleMap: options.styleMap
		});
	return wfs;
}
function createWFSviewparamsLayer(nombre,parametros)
{
    var options= getEscenariosConfigAnimCluster2();  
    var wfs = new OpenLayers.Layer.Vector(nombre, 
        {
        strategies: options.strategies,
        visibility: true,
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://localhost/geoserver/En_busca_del_tesoro/wfs',
            featureType: "Progreso_usuario",
            featureNS: "http://localhost:8080/geoserver/busqueda_tesoro",
            srsName: "EPSG:900913",
            version: "1.1.0",
            viewparams: parametros
        }), 
        styleMap: options.styleMap
        });
    return wfs;
}
function createHeatmapLayer()
{
var wms_concentracion = new OpenLayers.Layer.WMS("Concentración de usuarios",
        "http://localhost/geoserver/En_busca_del_tesoro/wms",
        {layers: 'En_busca_del_tesoro:mapa_calor_usuarios',transparent:true},
        {isBaseLayer: false, singleTile:true, visibility:false}
    );
return wms_concentracion;
}
function createriddle_editLayer(parametros)
{
var wms_concentracion = new OpenLayers.Layer.WMS("Pistas nuevo escenario",
        "http://localhost/geoserver/En_busca_del_tesoro/wms",
        {layers: 'En_busca_del_tesoro:pistas_edicion',transparent:true,viewparams: parametros},
        {isBaseLayer: false, singleTile:true, visibility:true}
    );
return wms_concentracion;
}



	function getEscenariosConfigAnimCluster()
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
				symbolizer: {
					externalGraphic: "images/cofre.png",
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
					externalGraphic: "images/caza-tesoro-icon.png",
					graphicOpacity: 1.0,
					graphicWidth: 64,
					graphicHeight: 64,
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
                    fontSize: "28px"
                }
            });
            var highRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "count",
                    value: 25
                }),
                symbolizer: {
					externalGraphic: "images/caza-tesoro-icon.png",
					graphicWidth: 80,
					graphicHeight: 80,
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
                    fontSize: "30px"
                }
            });
            
            // Create a Style that uses the three previous rules
            var style = new OpenLayers.Style(null, {
                rules: [photoRule,lowRule, middleRule, highRule]
            }); 
			var	styleMap= new OpenLayers.StyleMap({
			"default": style,
			"temporary": { graphicWidth:120, graphicHeight:120, fontSize: "80px" },
			});
			return { 'styleMap':styleMap, 'strategies':strategies };
		}

    function getEscenariosConfigAnimCluster2()
    {
/*  var animCluster= new OpenLayers.Strategy.AnimatedCluster({
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
            var filtro1 = new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                property: "finished",value: 1
                            })
            var filtro2 = new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                property: "id_riddle",value: null
                            })
            var finalizadoRule = new OpenLayers.Rule({
                filter: filtro1,
                symbolizer: {
                    externalGraphic:"images/pergamino2.png",
                    graphicWidth: 48,
                    graphicHeight: 48,
                    graphicOpacity: 1.0,
                }
            });
            var falloRule = new OpenLayers.Rule({
                filter: filtro2,
                symbolizer: {
                    externalGraphic:"images/fallo.png",
                    graphicWidth: 30,
                    graphicHeight: 30,
                    graphicOpacity: 1.0,
                    label: ""
                }
            });
            
             var falloRule2 = new OpenLayers.Rule({
                    filter: new OpenLayers.Filter.Logical({
                        type: OpenLayers.Filter.Logical.AND,
                        filters: [filtro1,filtro2]
                    }),
                symbolizer: {
                    externalGraphic:"images/fallo2.png",
                    graphicWidth: 30,
                    graphicHeight: 30,
                    graphicOpacity: 1.0,
                }
            });
             var photoRule = new OpenLayers.Rule({
                symbolizer: {
                    externalGraphic: "images/pergamino.png",//"images/cono.png",
                    graphicWidth: 48,
                    graphicHeight: 48,
                    graphicOpacity: 1.0,
                    label: "${num_riddle}",                               
                    fillOpacity: 1, 
                    strokeOpacity: 1,
                    strokeWidth: 12,
                    pointRadius: 15,
                    labelOutlineWidth: 1,
                    fontColor: "#000000",
                    fontOpacity: 1,
                    fontSize: "28px"
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
                    externalGraphic:"images/cono.png",
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
                    externalGraphic: "images/caza-tesoro-icon.png",
                    graphicOpacity: 1.0,
                    graphicWidth: 64,
                    graphicHeight: 64,
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
                    fontSize: "28px"
                }
            });
            var highRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "count",
                    value: 25
                }),
                symbolizer: {
                    externalGraphic: "images/caza-tesoro-icon.png",
                    graphicWidth: 80,
                    graphicHeight: 80,
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
                    fontSize: "30px"
                }
            });
            
            // Create a Style that uses the three previous rules
            var style = new OpenLayers.Style(null, {
                rules: [photoRule,falloRule,finalizadoRule,falloRule2,lowRule, middleRule, highRule]
            }); 
            var styleMap= new OpenLayers.StyleMap({
            "default": style,
            "temporary": { graphicWidth:120, graphicHeight:120, fontSize: "80px" },
            });
            return { 'styleMap':styleMap, 'strategies':strategies };
        }