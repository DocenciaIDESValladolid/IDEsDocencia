var map;

// use proxy if requesting features cross-domain
//OpenLayers.ProxyHost= "proxy.cgi?url=";

function init() {

var geometry= OpenLayers.Geometry.fromWKT(
        'POLYGON ((-3.6925100786497764 40.52193071731896, -3.692651836711012 40.52944435628611, -3.676352295887939 40.534476612934846, -3.6793935455781113 40.5240937176056, -3.6473674769606825 40.51053288347356, -3.6391360097428067 40.483779974207785, -3.590602841399816 40.44386021607628, -3.5951397485283314 40.42008649901884, -3.6158055482663456 40.410694262724654, -3.622289737885216 40.39612982906201, -3.5594945054328133 40.36402892435477, -3.572023775261345 40.343168878699025, -3.5448366740915063 40.324603470620815, -3.5480306448724153 40.30658110549548, -3.581592135954992 40.33785393202248, -3.5821736774276363 40.3477420956554, -3.571510245145995 40.3573826838595, -3.6326516458878495 40.392424382792065, -3.6237944138276936 40.41674822144286, -3.603464819506754 40.425755446157346, -3.5992412797564475 40.438042296408945, -3.6468436907904285 40.47740356568752, -3.6540497096273805 40.503092154791, -3.687581732509409 40.51293633335036, -3.6925100786497764 40.52193071731896))');
    map = new OpenLayers.Map({
        div: "map",
        layers: [
           new OpenLayers.Layer.WMS(
                "OpenLayers WMS",
                "http://vmap0.tiles.osgeo.org/wms/vmap0",
                {layers: 'basic'},
                {singleTile: true}
            )
,
            new OpenLayers.Layer.Vector("WFS", {
                strategies: [new OpenLayers.Strategy.BBOX()],
                protocol: new OpenLayers.Protocol.WFS({
                    url:  "http://localhost/geoserver/wfs",
                    featureType: "radares",
                    featureNS: "http://localhost/semana8"
                }),
                styleMap: new OpenLayers.StyleMap({
                    strokeWidth: 3,
                    strokeColor: "#333333"
                }),
                filter: new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.AND,
                    filters: [
                        new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.EQUAL_TO,
                            property: "TYPE",
                            value: "radares"
                        }),
                        new OpenLayers.Filter.Spatial({
                             type: OpenLayers.Filter.Spatial.INTERSECTS,
                             property: "geom",
                             value: geometry
                        })
                    ]
                })
            })
        ],
        center: new OpenLayers.LonLat(146.7, -41.8),
        zoom: 6
    });

}
