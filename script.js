var rows = 1;
var columns = 1024;

var dragrows = 1;
var dragcolumns = 33;
var $dragonerow = $("<div />", {
  class: 'dragonerow'
});

$(document).ready(function() {

  $("#selector").hide();
  $("#selector").fadeIn(1000);


  // ----------------On crée la palette et la grille----------------------------

  for (var j = 0; j < dragrows; j++) {

    // -----------------------creation palette------------------------------------

    $("#selector").append('<div class="row"><div class="col-xs-4">' +
      '<p id="inputcolorp">Spectre<br><br><input type="color" name="inputcolor" id="inputcolor"></div>'+
      '<div class="selectcolorbox"><p>Selection</p><div class="selectcolor"></div></div>'+
      '<div class="boxbtn col-xs-8"><button class="reset btn btn-danger">reset</button>' +
      '<button class="view btn btn-success">view</button></div></div>');

    $(".outils").append('<p>1px</p><div class="size1"></div><p>3px</p><div class="size2"></div><p>5px</p><div class="size3"></div>');

    $("#selector").append(($dragonerow).clone());
  }

  for (var j = 0; j < dragcolumns; j++) {
    var $dragsquare = $("<div />", {
      class: 'dragsquare',
      id: 'drag' + j
    });
    $(".dragonerow").append($dragsquare.clone());

    // -------------------on génère une couleur hexa aléatoire----------------

    var color = "#" + Math.random().toString(16).slice(2, 8);
    $("#drag" + j).css('backgroundColor', color);
  }

  // --------------------------creation grille----------------------------------


  for (var i = 0; i < rows; i++) {
    var $onerow = $("<div />", {
      class: 'onerow'
    });
    $("#wrapper").append($onerow.clone());
  }

  for (var i = 0; i < columns; i++) {
    var $square = $("<div />", {
      class: 'square',
      id: i
    });
    $(".onerow").append($square.clone());
  }

  // -------colorisation du titre---------------------------------

  function changeh1() {
    var colorh1 = "#" + Math.random().toString(16).slice(2, 8);
    $("h1").css('color', colorh1);
  };
  setInterval(changeh1, 500);


  // ---------------------UPLOAD DU MODELE----------------------------------

  function upload() {
    // A chaque sélection de fichier
    $('#my_form').find('input[name=userfile]').on('change', function(e) {
      var files = $(this)[0].files;

      if (files.length > 0) {
        // On part du principe qu'il n'y qu'un seul fichier
        // étant donné que l'on a pas renseigné l'attribut "multiple"
        var file = files[0],
          $image_preview = $('#image_preview');

        // Ici on injecte les informations recoltées sur le fichier pour l'utilisateur
        $image_preview.find('.thumbnail').removeClass('hidden');
        $image_preview.find('img').attr('src', window.URL.createObjectURL(file));
        $image_preview.find('h4').html(file.name);
        $image_preview.find('.caption p:first').html(file.size + ' bytes');
      }
    })

    // --------------- Bouton "Annuler" pour vider le champ d'upload-------------
    $('#image_preview').find('button[type="button"]').on('click', function(e) {
      e.preventDefault();

      $('#my_form').find('input[name=userfile]').val('');
      $('#image_preview').find('.thumbnail').addClass('hidden');
    });
  }

  // -----------------------caption de la couleur palette----------------------
  // -----------------event on change input color on recup valeur couleur-----

  $(".selectcolor").css('backgroundColor', 'white');

  function createpal() {

    var k = j - 1;
    $('input[name=inputcolor]').on("change", function() {
      k = k + 1;
      color = $(this).val();
      console.log(color);


      // ---------------on créer la palette issue de l'input color--------------------

      $dragsquare = $("<div />", {
        class: 'dragsquare',
        id: 'drag' + k
      });

      $(".dragonerow").append($dragsquare);
      $("#drag" + k).css('backgroundColor', color);
      $(".selectcolor").css('backgroundColor', color);
      console.log(color);
      clickcolor();
    });
    clickcolor();
    tracage();

  }




  // -------function on applique la couleur à la grille----------------
  function tracage() {
  pinceau1px();

  $(".size2").click(function(){
  cube3px();
  });

  $(".size1").click(function(){
  pinceau1px();
  });
};

  // ------------function caption de la couleur au click palette----------------

  function clickcolor() {

    $(".dragsquare").click(function() {

      color = $(this).css('backgroundColor');
      $(".selectcolor").css({'backgroundColor': color,
                             'background-image' : 'none'});
    });

    $("#drag0").click(function(){

        $(".selectcolor").css({'backgroundColor': 'transparent',
                                'background-image' : 'url("img/transparence.jpg")'});
    });

  }

  // ---------------function reset la grille-------------------------
  function reset() {
    $(".square").css('backgroundColor', 'transparent');

  }

  // -----------------function preview sans la grille---------------
  function view() {
    $(".square").css({
      'border': 'none'
    });

    $(".view").focusout(function() {
      $(".square").css({
        'border': '1px inset'
      });
    });
  }

// ------------------------pinceau 1px---------------------------------
function pinceau1px(){

$('.square').click(function(){

$(this).css('backgroundColor', color);

});
    $('.square').mousedown(function() {
      $('.square').mousemove(function() {

        $(this).css('backgroundColor', color);
      });
    });
    $('.square').mouseup(function() {
      $('.square').off('mousemove');

    });
}

// ------------------------pinceau 3px---------------------------------//

function cube3px(){

$('.square').click(function(){

  var id= $(this).attr("id");
  var idint= parseInt(id);

  $(this).css('backgroundColor', color);
  $("#"+(idint+1)).css('backgroundColor', color);
  $("#"+(idint-1)).css('backgroundColor', color);
  $("#"+(idint+31)).css('backgroundColor', color);
  $("#"+(idint+32)).css('backgroundColor', color);
  $("#"+(idint+33)).css('backgroundColor', color);
  $("#"+(idint-31)).css('backgroundColor', color);
  $("#"+(idint-32)).css('backgroundColor', color);
  $("#"+(idint-33)).css('backgroundColor', color);


});

  $('.square').mousedown(function() {
    $('.square').mousemove(function() {

      var id= $(this).attr("id");
      var idint= parseInt(id);

      $(this).css('backgroundColor', color);
      $("#"+(idint+1)).css('backgroundColor', color);
      $("#"+(idint-1)).css('backgroundColor', color);
      $("#"+(idint+31)).css('backgroundColor', color);
      $("#"+(idint+32)).css('backgroundColor', color);
      $("#"+(idint+33)).css('backgroundColor', color);
      $("#"+(idint-31)).css('backgroundColor', color);
      $("#"+(idint-32)).css('backgroundColor', color);
      $("#"+(idint-33)).css('backgroundColor', color);

    });
  });
  $('.square').mouseup(function() {
    $('.square').off('mousemove');

  });
  };


  upload();
  createpal();

  $(".reset").click(function() {
    reset();
  });

  $(".view").focusin(function() {
    view();
  });

});
