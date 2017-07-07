var rows = 32;
var columns = 32;
var $onerow = $("<div />", {
  class: 'onerow'
});
var $square = $("<div />", {
  class: 'square',
  id: 'drop'
});

var dragrows = 1;
var dragcolumns = 33;
var $dragonerow = $("<div />", {
  class: 'dragonerow'
});

$(document).ready(function() {

  $("#selector").hide();
  $("#selector").fadeIn(1000);


  // -------colorisation du titre---------------------------------

  function changeh1() {
    var colorh1 = "#" + Math.random().toString(16).slice(2, 8);
    $("h1").css('color', colorh1);

  };
  setInterval(changeh1, 500);


  // ----------------On crée la palette et la grille----------------------------

  for (var j = 0; j < dragrows; j++) {

    // -----------------------creation palette------------------------------------

    $("#selector").append('<div class="row"><div class="col-xs-4">'+
    '<p>Spectre<br><br><input type="color" name="inputcolor" id="inputcolor"></div>'+
    '<div class="col-xs-4"><p>Selection</p><div class="selectcolor"></div></div>'+
    '<div class="col-xs-4"><button class="reset btn btn-danger">reset</button>'+
    '<button class="view btn btn-success">view</button></div></div>');
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
    $("#wrapper").append($onerow.clone());
  }

  for (var i = 0; i < columns; i++) {
    $(".onerow").append($square.clone());
  }

  // ------------------------preview de l'image upload---------------------------

  $(function() {
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
    });

    // --------------- Bouton "Annuler" pour vider le champ d'upload-------------
    $('#image_preview').find('button[type="button"]').on('click', function(e) {
      e.preventDefault();

      $('#my_form').find('input[name=userfile]').val('');
      $('#image_preview').find('.thumbnail').addClass('hidden');
    });
  });

  // -----------------------caption de la couleur palette----------------------
  // -----------------event on change input color on recup valeur couleur-----
function createpal(){

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

  });
clickcolor();
tracage();
}

createpal();

  // -------function on applique la couleur à la grille----------------

  function tracage() {

// -------------clic pour replir une case------------------------------

  $('.square').click(function(){
$(this).css('backgroundColor', color);
  });

  // -------mousecatcher pour remplir plusieurs cases----------------------
$('.square').mousedown(function(){
  $('.square').mousemove(function(){
    $(this).css('backgroundColor', color);
  });
});
  $('.square').mouseup(function(){
    $(".square").off('mousemove');

  });
};

  // ------------function caption de la couleur au click palette-----------------
  $(".selectcolor").css('backgroundColor', 'white');

  function clickcolor() {

    $(".dragsquare").click(function() {

      color = $(this).css('backgroundColor');
      $(".selectcolor").css('backgroundColor', color);
      tracage();
    });
  }
  clickcolor();

  // ---------------function reset la grille-------------------------

  $(".reset").click(function() {

    $(".square").css('backgroundColor', 'inherit');
  })

  // -----------------function preview sans la grille---------------

    $(".view").focusin(function() {
      $(".square").css({
        'border': 'none'});

      $(".view").focusout(function() {
        $(".square").css({
          'border': '1px inset'});
      });
    });
});
