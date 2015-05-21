var state='welcoming';// authenticated,createScenario,creatingScenario,createRiddle,running
var scenario_under_creation=null;
var scenario_running='';

function setState(newstate)
{
    state=newstate;
    updateUI();
}

function updateUI()
{
//    if (state==='authenticated'){
//         // Puesto aquí para probar el funcionamiento
//         enable_edit_polygons(function(event){
//            alert("feature creada");
//            disable_edit_polygons();
//        });
//        
//    }else
    if (state==='welcoming'){
        $("#validarUbicacion").hide();
        $("#nuevoescenario_button").hide();
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
        $("#infopanel").panel('open');
    }else if (state==='authenticated'){
        $("#validarUbicacion").hide();
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
		$("#nuevoescenario_button").show();
    }else if (state==='createScenario'){
		$("#validarUbicacion").hide();
    }else if (state==='creatingScenario'){
        $("#validarUbicacion").hide();
        $("#infoCreatingScenarioPanel").panel('open');
    }else if (state==='createRiddle'){
		$("#welcomingInfo").hide();
		$("#createRiddleInfo").show();
        $("#infoCreatingScenarioPanel").panel('open');
        enable_edit_polygons(function(event)
        {
            var geom= event.feature.geometry;
            $("#riddle_geom").val(geom.toString());
            
            $.mobile.changePage("#addRiddlePage");
            emptyPolygonLayer();
        });
        $("#validarUbicacion").hide();
    }else if (state==='running'){
        $("#validarUbicacion").show();
        // $("#validarUbicacion").button('enable');
    }
	
	$("#mappage").trigger( "updatelayout" );

}
function initTesoro(){

    $("#nuevoescenario_button").bind("click",nuevoescenario_button_action);

    enableForm('#createScenarioForm', 
        function(result){
             scenario_under_creation=result.idStage;
             toast('Escenario creado');
             $("#createScenarioForm")[0].reset();
             setState('createRiddle');
        },
        function(error){
             toast('Network error has occurred please try again!'+error);
        });
}


function nuevoescenario_button_action(event,ui){
        /*setState('createScenario');*/
		
        //Si el usuario ha marcado un punto sobre el mapa...
        if (state==="authenticated")
        {
            $("#scenario_iduser").val(fb.user.id);
            $("#create_scenario_panel").panel('open');
        }
    }

function marca_pulsada(event){
	if (state==="welcoming"){
		$("#infopanel").panel("open");
	}		
    else if (state==="authenticated"){
        /*setState("createScenario");*/
        
//        $("#scenario_iduser").attr('value','XXX')
        $("#create_scenario_panel").panel("open");
    }
}

function facebook_logout(response){
	window.location.href = 'index.html';
	// setState('welcoming');
}

function enableForm(id_form, onsuccess, onfailure){ 
    $(id_form).submit(function (submitevent){ // catch the form's submit event
        submitevent.preventDefault();
        var $form = $(this);
        var terms = {};
        var $inputs =$form.find("input");
        $inputs.each(function(){
            terms[this.name]=$(this).val();
        });
        terms = $form.serialize();
            url = $form.attr("action");
      
            // Send data to server through the Ajax call
            // action is functionality we want to call and outputJSON is our data
             $.ajax({url: url,
                        data: terms,
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.loading('show'); // This will show ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.loading('hide'); // This will hide ajax spinner
                        },
                        success: function (result) {
                           
                                if (typeof(onsuccess) === "function")
                                {
                                    onsuccess(result);
                                }                         
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action   
                            if (typeof(onfailure) === "function")
                                {
                                    onfailure(error);
                                }  
                           
                        }
                    });                   
                    
            return false; // cancel original event to prevent form submitting
        });    
    
}

function enable_edit_polygons(callback)
{
     var vlayers = map.getLayersByName( "Tesoro:Editable" );
     if (vlayers.length>0)
     {
        var vlayer = vlayers[0];
        vlayer.events.remove('featureadded');
        vlayer.events.on({'featureadded':callback});
        var controls= map.getControlsBy('CLASS_NAME','OpenLayers.Control.DrawFeature');
        controls[0].activate();
     }  
          
}
function disable_edit_polygons()
{
    var vlayers = map.getLayersByName( "Tesoro:Editable" );
     if (vlayers.length>0)
     {
    var vlayer=vlayers[0];
    vlayer.removeAllFeatures();
    vlayer.events.remove('featureadded');
    var controls= map.getControlsBy('CLASS_NAME','OpenLayers.Control.DrawFeature');
     controls[0].deactivate();
    }
}
function emptyPolygonLayer()
{
    var vlayers = map.getLayersByName( "Tesoro:Editable" );
     if (vlayers.length>0)
     {
    var vlayer=vlayers[0];
    vlayer.removeAllFeatures();
     }
}
function pistascreadas(user,path)
{
    var viewparams='param_user:'+user+';param_path:'+path;
    var capa= createriddle_editLayer(viewparams);
    map.addLayer(capa);
    map.updateSize();
}
function eliminarcapa(nombre){
    var layer=map.getLayersByName(nombre);
    map.removeLayer(layer);
    map.updateSize();
    layer.destroy();
}
