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
    /**
    $(document).ready(function () {
        setupOpenLayers();
    });
    */
    $("#page__main").on("pageshow", function () {
        setupOpenLayers();
    });
    $("#Step_app").click(function () {
        updateInvaders();
    });
    $("#Play_app").click(function () {
        startLoop();
    });
    $("#Pause_app").click(function () {
        stopLoop();
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
                if (optionsData[i].name === configLayersData[j].name && optionsData[i].state === true) {
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
        displayBoundingBox();
        map.generate(optionsLayersData, optionsLayerInvader);
        stopLoop();
    });
}

function displayError(error) {
    $("#error__text").text(error);
    $("#popup__error").popup("open");
}

var fps = 1;
var now;
var then = performance.now();
var interval = 1000 / fps;
var delta;

var loopID = undefined;

function startLoop() {
    if (!loopID) {
        loopID = requestAnimationFrame(draw);
    }
}

function stopLoop() {
    if (loopID) {
        cancelAnimationFrame(loopID);
        loopID = undefined;
    }
}

function draw() {

    loopID = requestAnimationFrame(draw);

    now = performance.now();
    delta = now - then;

    if (delta > interval) {
        // update time stuffs

        // Just `then = now` is not enough.
        // Lets say we set fps at 10 which means
        // each frame must take 100ms
        // Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until
        // delta > interval === true
        // Eventually this lowers down the FPS as
        // 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms
        // by subtracting delta (112) % interval (100).
        // Hope that makes sense.

        then = now - (delta % interval);

        // ... Code for Drawing the Frame ...
        updateInvaders();
    }

}