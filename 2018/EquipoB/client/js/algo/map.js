var map = {
  width: 100,
  height: 100,
  layers: [],
  layerInvader:null,

  generate: function(layersData, layerInvader) {
    //TODO: See about launch multiple fetch at same time
    //https://stackoverflow.com/questions/38150791/making-multiple-fetch-api-calls-how-to-check-if-all-calls-have-finished/38151731?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    for(var i in layersData) {
      fetchLayerFromGeoserver(layersData[i]);
    }
    map.layerInvader = new LayerInvader(100,100,layerInvader.name,layerInvader.color);
  }
};

setupInvasionX();

function setupInvasionX() {
  map.generate([layerPopulation, layerGraveyard, layerHospital, layerWaste, layerPension, layerMonument], layerZombie);
}
