var state='welcoming';// createScenario,running, 
var scenario_under_creation=null;
var scenario_running='';


function setState(newstate)
{
    state=newstate;
    updateUI();
}
function updateUI()
{
    if (state==='welcoming'){
        $("#validarUbicacion").hide();
        $("#infopanel").panel('open');
        $("#nuevoescenario_button").button('enable');
    }else if (state =='running'){
        $("#validarUbicacion").show();
        $("#validarUbicacion").button('enable');
    }else if (state=='createScenario')
    {
        $("#nuevoescenario_button").hide();
    }
}
function initTesoro(){
    $("#nuevoescenario_button").bind("click",function(event,ui){
        setState('createScenario');
        $("#infopanel").panel('close');
    });
}

function marca_pulsada(event){
    if (state==="welcoming" || state==="createScenario"){
        setState("createScenario");
        $("#scenario_iduser").val(fb.user.id);
//        $("#scenario_iduser").attr('value','XXX')
        $("#create_scenario_panel").panel("open");
    }
    
}