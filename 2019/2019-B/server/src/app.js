/**
 * Demo functions
 */
$('#mappage').on("pageinit", function(){
  add_demo_functions();
  initmap();
  initApp();
});
function initApp() {
     /**
     * Location searching panel
     */
    $("#autocomplete").on("filterablebeforefilter", function (e, data) {
      var $ul = $(this),
          value = $(data.input).val(),
          html = "";
      $ul.html(html);
      if (value && value.length > 2) {
          $.mobile.loading("show", {
              text: 'searching',
              textVisible: true,
              theme: "b"
          });
          openStreetMapGeocoder.geocode(value, function (response) {
              if (response[0] === false) {
                  $ul.html("<li data-filtertext='" + value + "'>" + "noresults" + "</li>");
              } else {
                  $.each(response, function (i, place) {
                      $("<li data-filtertext='" + value + "'>")
                          .hide().append($("<a href='#'>").text(place.totalName)
                              .append($("<p>").text(place.type))
                          ).appendTo($ul).click(function () {
                              var extent = [];
                              extent[0] = parseFloat(place.boundingbox[2]);
                              extent[1] = parseFloat(place.boundingbox[0]);
                              extent[2] = parseFloat(place.boundingbox[3]);
                              extent[3] = parseFloat(place.boundingbox[1]);
                              extent = ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
                              fly_to(map, null, extent);
                              $('#searchpanel').panel("close");
                          }).show();
                  });
              }
              $ul.listview("refresh");
              $ul.trigger("updatelayout");
              $.mobile.loading("hide");
          });
      }
  });
  // Scroll to collapsible expanded
  $("#infopanel").on("collapsibleexpand", "[data-role='collapsible']", function (event, ui) {
      var innerinfopanel = $("#infopanel .ui-panel-inner");
      innerinfopanel.animate({
          scrollTop: parseInt($(this).offset().top - innerinfopanel.offset().top
              + innerinfopanel.scrollTop())
      }, 500);
  });
  // Set a max-height to make large images shrink to fit the screen.
  $(document).on("popupbeforeposition", function () {
      var maxHeight = $(window).height() - 200 + "px";
      $('.ui-popup [data-role="content"]').css("max-height", maxHeight);
  });
  // Remove the popup after it has been closed to manage DOM size
  $(document).on("popupafterclose", ".ui-popup:not(#popupdialog)", function () {
      $(this).remove();
      select.getFeatures().clear();
  });
  $(document).on("click", "#acceptupdates", function () {
      infomsgs = [];
  });
  // Redraw map
  // Customize this
  $(window).on("pagecontainershow resize", function (event, ui) {
      $.mobile.resetActivePageHeight();
      var pageId = $.mobile.pageContainer.pagecontainer('getActivePage').prop("id");
      if (pageId === 'mappage') {
          if (event.type === "resize") {
              setTimeout(function () {
                  map.updateSize();
              }, 200);
          } else {
              map.updateSize();
              // Do something smart in this update
              fit_map_to_layer(sourceLayer);
          }
      } else if (pageId === 'historypage') {
          if (event.type === 'pagecontainershow') {
              //alert("show something");
          }
      } else if (pageId === 'questionpage') {
          if (event.type === 'pagecontainershow') {
              if (lastsuccessfulstage.question === '') {
                  $.mobile.pageContainer.pagecontainer("change", "#mappage");
              } else {
                  alert("set something");
              }
          }
      }

  });
  //Buttons events
  $('#autolocate').on('click', function () {
      autolocate(true);
  });
  $('#dibujar').on('click', function () {
      dibujar(true);
  });
  $('#editar').on('click', function () {
      editar(true);
  });
  $('#calcular').on('click', function () {
      calcular(true);
  });
  $('#infopanel').panel({
      beforeclose: function () {
          select.getFeatures().clear();
      }
  });

  /*-------------------------------Initialize page -------------*/
  if ($.mobile.autoInitializePage === false) {
      $("#container").show();
      $("#loader").remove();
      $.mobile.initializePage();
      var viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, ' +
          'maximum-scale=1.0, user-scalable=0,target-densitydpi=medium-dpi');
  }
}
/**
 * @param {*} cdemo 
 * @param {*} cvalue 
 * @param {*} exdays 
 */
function setCookie(cdemo, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cdemo + "=" + cvalue + "; " + expires;
}
function getCookie(cdemo) {
    var demo = cdemo + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(demo) == 0) {
            return c.substring(demo.length, c.length);
        }
    }
    return "";
}
function checkCookie(cookiename, redirect) {
    var demo = getCookie(cookiename);
    if (demo == "false") {
        document.location.href = redirect;
    }
    setCookie(cookiename, false, 1000);
}
/*-------------------------------Helper functions -------------*/
function toast(msg) {
  if ($(".toast").length > 0) {
      setTimeout(function () {
          toast(msg);
      }, 2500);
  } else {
      $("<div class='ui-loader ui-overlay-shadow  ui-corner-all toast'>" +
          "<p>" + msg + "</p></div>")
          .css({
              left: ($(window).width() - 284) / 2,
              top: $(window).height() / 2
          })
          .appendTo($.mobile.pageContainer).delay(2000)
          .fadeOut(400, function () {
              $(this).remove();
          });
  }
}
function create_popup(type, title, body) {
  var header = $('<div data-role="header"><h2>' + title + '</h2></div>'),
      content = $('<div data-role="content" class="ui-content ui-overlay-b">' + body
          + '</div>'),
      popup = $('<div data-role="popup" id="' + type + '"' +
          'data-theme="b" data-transition="slidedown"></div>');
  if (type === 'info') {
      $('<a href="#" data-rel="back" class="ui-btn ui-corner-all' +
          'ui-btn-b ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>').appendTo(header);
  }
  if (type === 'displayupdates') {
      $('<p class="center-wrapper"><a id="acceptupdates" href="#" data-rel="back"'
          + 'class="ui-btn center-button ui-mini ui-btn-inline">'
          + "continue" + '</a></p>')
          .appendTo(content);
      var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
      $(popup).attr(attributes);
  }
  if (type === 'displayerror') {
      $('<p class="center-wrapper"><a href="view.php?id=' + cmid +
          '" class="ui-btn  center-button ui-mini ui-icon-forward ui-btn-inline ui-btn-icon-left"'
          + 'data-ajax="false">' + "continue" + '</a></p>')
          .appendTo(content);
      var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
      $(popup).attr(attributes);
  }
  // Create the popup.
  $(header)
      .appendTo($(popup)
          .appendTo($.mobile.activePage)
          .popup())
      .toolbar()
      .after(content);
  // Need it for calculate popup's dimesions when popup contents an image.
  totalimg = $(content).find('img');
  if (totalimg.length > 0) {
      $.mobile.loading("show");
      totalimg.one('load', function () {
          imgloaded++;
          if (totalimg.length === imgloaded) {
              open_popup(popup);
              imgloaded = 0;
              // Clear the fallback
              clearTimeout(fallback);
              $.mobile.loading("hide");
          }
      });
      // Fallback in case the browser doesn't fire a load event
      var fallback = setTimeout(function () {
          open_popup(popup);
          $.mobile.loading("hide");
      }, 2000);
  } else {
      open_popup(popup);
  }


}
function open_popup(popup) {
  // Because chaining of popups not allowed in jquery mobile.
  if ($(".ui-popup-active").length > 0) {
      $(".ui-popup").popup("close");
      setTimeout(function () {
          $(popup).popup("open", { positionTo: "window" });
      }, 1000);
  } else {
      $(popup).popup("open", { positionTo: "window" });
  }

}
function get_block_text(title, body) {
  return '<div class="ui-bar ui-bar-a">' + title +
      '</div><div class="ui-body ui-body-a">' + body +
      '</div>';
}