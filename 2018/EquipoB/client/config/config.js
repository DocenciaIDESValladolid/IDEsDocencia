var minLon = 3.438721;
var maxLon = 4.262695;

var minLat = 43.344156;
var maxLat = 43.858297;

var sizeCellx = (maxLon - minLon) / 100;
var sizeCelly = (maxLat - minLat) / 100;

var configLayersData = [
  layerPopulation = {
    name: 'population',
    color: '#33FF42',
    infectionProbability: 0.5,
    xml: '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST"><wps:Body><wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:invasionx="invasionx"><wfs:Query typeName="invasionx:pop4326"/></wfs:GetFeature></wps:Body></wps:Reference></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>'+minLon+' '+minLat+'</ows:LowerCorner><ows:UpperCorner>'+maxLon+' '+maxLat+'</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>',
    data: null
  },
  layerGraveyard = {
    name: 'graveyard',
    color: '#808080',
    infectionProbability: 1,
    xml: '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDCARTO_BDD_WLD_WGS84G:cimetiere&amp;bbox=3.438721,43.344156,4.262695,43.858297&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>'+minLon+' '+minLat+'</ows:LowerCorner><ows:UpperCorner>'+maxLon+' '+maxLat+'</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>',
    data: null
  },
  layerHealth = {
    name: 'health',
    color: '#cd2626',
    infectionProbability: 0.75,
    xml: '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_sante&amp;bbox=3.438721,43.344156,4.262695,43.858297&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>'+minLon+' '+minLat+'</ows:LowerCorner><ows:UpperCorner>'+maxLon+' '+maxLat+'</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>',
    data: null
  },
  layerReligious = {
    name: 'religious',
    color: '#000000',
    infectionProbability: 0,
    xml: '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_religieux&amp;bbox=3.438721,43.344156,4.262695,43.858297&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>'+minLon+' '+minLat+'</ows:LowerCorner><ows:UpperCorner>'+maxLon+' '+maxLat+'</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>',
    data: null
  },
  layerMilitary = {
    name: 'military',
    color: '',
    infectionProbability: 0,
    xml: '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_administratif_militaire&amp;bbox=3.438721,43.344156,4.262695,43.858297&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>'+minLon+' '+minLat+'</ows:LowerCorner><ows:UpperCorner>'+maxLon+' '+maxLat+'</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>',
    data: null
  },
  layerWater = {
    name: 'water',
    color:'',
    infectionProbability: 0,
    xml: '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDTOPO_BDD_WLD_WGS84G:troncon_cours_eau&amp;bbox=3.438721,43.344156,4.262695,43.858297&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>'+minLon+' '+minLat+'</ows:LowerCorner><ows:UpperCorner>'+maxLon+' '+maxLat+'</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>',
    data: null
  }
]
var configLayersInvader = [
  layerZombie = {
    name: "zombie",
    color: "#FF0000",
    infectionRate: 0.2
  },
  layerVampire = {
    name: "vampire",
    color: "#FF0000",
    infectionRate: 0.15
  }
]