var fb = {
  config :{
  // CONFIG VARS: 

    //JOSU APP    app_id : '616622821758240',
    //app_id : '288631441316558', // FixCity2 App
    app_id : '288632621316440', //FixCity2 TestApp

    use_xfbml : true,

    extendPermissions : 'email,publish_actions',  //'publish_stream' , 
    // info: http://developers.facebook.com/docs/reference/api/permissions/

    locale : 'es_ES'
    // all locales in: http://www.facebook.com/translations/FacebookLocales.xml

  // END CONFIG VARS
  },
  perms : [],
  hasPerm : function (perm) { 
      for(var i=0, l=fb.perms.length; i<l; i++) { 
          if(fb.perms[i] == perm) {
              return true;
          }
      } 
      return false; 
  },
  logged : false,
  id_post: false,
  user : false, // when login, is a user object: http://developers.facebook.com/docs/reference/api/user
  login : function (callback){
    FB.login(function(r) {
      if (r.status == 'connected') {
        FB.api('/me/permissions',function(perm){
          fb.logged = true;
		  fb.perms = [];
		  for(i in perm.data[0])
		  {
			if (perm.data[0][i] == 1)
			{
				fb.perms.push(i);
			}
		  }
        });
		fb.getUser(callback);
      } else {
        fb.logged = false;
        fb.perms = [];
		callback();
      }
    },{scope:'email,publish_actions'});
    return false;
  },
  syncLogin : function (callback, mensaje, id_denuncia, url){
    if (!callback) callback = function(){};
    FB.getLoginStatus(function(r) {
      if (r.status == 'connected' ) { 
        FB.api('/me/permissions',function(perm){
          fb.logged = true;
		  fb.perms = [];
		  for(i in perm.data[0])
		  {
			if (perm.data[0][i] == 1)
			{
				fb.perms.push(i);
			}
		  }
        });
        fb.getUser(callback);
        if(url){
            fb.publish1(url, mensaje, id_denuncia);
        }
        if (!url && mensaje){
            fb.update(mensaje, id_denuncia);
        }
        callback(true);
      } else {
        fb.logged = false;
        callback();
        return false;
      }
    });
  },
  logout : function(callback) {FB.logout(callback);},
  getUser : function(callback){
    FB.api('/me', function(r){
      var user = r;
      user.picture = "https://graph.facebook.com/"+user.id+"/picture";
      fb.user=user;
      callback(user); 
    }); 
  },
  likes : function(id_post){
      FB.api(id_post +'/likes', function (response){
          if (response && !response.error){
              $.get("likes.php", {id_post:id_post, likes:response.data.length})
          }
          else{
              alert ('error likes');
          }
      })
  },
  publish1 : function(url, mensaje, id_denuncia){ 
                        var privacy = {"value":"EVERYONE"};
                        FB.api('/me/photos', 'post', { url: url, message: mensaje, privacy: privacy }, function(response1) {
                          if (!response1 || response1.error) {
                            alert('Se ha producido un error y su actualización no ha sido publicada');
                          } else {
                            fb.id_post = response1.id;  
                            $.get("nuevo_id.php", {id_post:fb.id_post, id_denuncia:id_denuncia},
                                function (){
                                    alert('Correcto');
                            })
                            alert('Publicación publicada correctamente');
                          }
                        });          
  },
  update: function(mensaje, id_denuncia){
      FB.api("/"+id_denuncia+"/comments", "post", {message: mensaje}, function(response) {
          if (!response || response.error) {
            alert('Se ha producido un error y su actualización no ha sido publicada');
          } else {
            alert('Publicación publicada correctamente');
          }
      });
  },
  readyFuncs : [],
  ready: function(func){fb.readyFuncs.push(func)},
  launchReadyFuncs : function () {for(var i=0,l=fb.readyFuncs.length;i<l;i++){fb.readyFuncs[i]();};}
}
window.fbAsyncInit = function() { 
  if (fb.config.app_id) {
      FB.init({appId: fb.config.app_id, status: true, cookie: true, xfbml: fb.config.use_xfbml});
  }
  fb.syncLogin(fb.launchReadyFuncs);
};
var oldload = window.onload;
window.onload = function() {
            var d = document.createElement('div'); d.id="fb-root"; document.getElementsByTagName('body')[0].appendChild(d);
            var e = document.createElement('script'); e.async = true; e.src = document.location.protocol + '//connect.facebook.net/'+fb.config.locale+'/all.js';
            document.getElementById('fb-root').appendChild(e);
            if (typeof oldload == 'function') oldload();
};

// Funcion para logarse con Facebook.
function login() {
  fb.login(function(){ 
    if (fb.logged) {
		// Cambiamos el link de identificarse por el nombre y la foto del usuario.
		updateFacebookLoginInfo(fb);
    } else {
      toast("No se pudo identificar al usuario");
    }
  })
};

// Funcion para actualizar la información de facebook
function updateFacebookLoginInfo(fb)
{
	id_facebook = fb.user.id;
	name_facebook = fb.user.name;
	var fb_user_label = '<img valign="center" height="30" src="'+fb.user.picture+'"/>' + fb.user.name;
	var html = fb_user_label + '<a href="#" class="ui-btn  ui-btn-icon-left ui-icon-delete" onclick="fb.logout(function(response) {window.location.href = \'index.html\';});return false;">Salir</a></p>';
	$("#estadoLogin").html(html);
	$("#iniciosesionFacebook").hide();
	$("#misdenuncias_button").show();
	$("#nuevadenuncia_loc_actual_button").show();
	$("#search_button").show();
	$("#mappage").trigger( "updatelayout" );
	toast(fb_user_label);
	
	$("#id_facebook").val(fb.user.id);
	$("#name_facebook").val(fb.user.name);
	$("#misdenuncias_button").attr('href','mis_denuncias.php?id='+fb.user.id);
	$("#email_facebook").val(fb.user.email);
	
	html = 'Usuario: ' + fb.user.name + ' correo es: ' + fb.user.email;
	$("#usuario_info_prueba").html(html);
	
}


