////////////////////////////////////////////////////////////////
//                                                            //
//                              UI                            //
//                                                            //
////////////////////////////////////////////////////////////////


setupUI();

/**
 * 
 */
function setupUI() {
    $(document).ready(function () {
        setupOpenLayers();
    });
    $("#Step_app").click(function () {
        updateInvaders();
    });
    $("#Accept_option").click(function () {
        map.reset();
        var optionsData = [];
        var optionsInvader;
        var optionsLayersData = [];
        var optionsLayerInvader;
        $('#Layers_data input[type=checkbox]').each(function () {
            var checkbox = {
                name: $(this).attr('id'),
                state: $(this).is(':checked')
            }
            optionsData.push(checkbox);
        });
        var optionsInvader = $('input[name="typeInvasion"]:checked').val();
        for (var i in optionsData) {
            for (var j in configLayersData) {
                if (optionsData[i].name === configLayersData[j].name && optionsData[i].state===true) {
                    optionsLayersData.push(configLayersData[j])
                }
            }
        }
        for (var i in optionsInvader) {
            for (var j in configLayersInvader) {
                if (optionsInvader === configLayersInvader[j].name) {
                    optionsLayerInvader = configLayersInvader[j];
                }
            }
        }
        map.generate(optionsLayersData, optionsLayerInvader);
        displayInvaders(map.layerInvader.grid);
    });
    $("#Launch_app").click(function () {
        
    });
}
