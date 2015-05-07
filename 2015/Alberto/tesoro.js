var state='welcoming';// createScenario,running, 

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