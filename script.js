var rows = 16;
var columns = 16;
var $onerow = $("<div />", {class: 'onerow'});
var $square = $("<div />", {class: 'square', id: 'drop'});

var dragrows = 1;
var dragcolumns = 5;
var $dragonerow = $("<div />", {class: 'dragonerow'});

$(document).ready(function(){
    for(var j = 0; j < dragrows; j++){

            $("#selector").append(($dragonerow).clone());
    }

    for(var j = 0; j < dragcolumns; j++){
      var $dragsquare = $("<div />", {class: 'dragsquare', id: 'drag'+j});
            $(".dragonerow").append($dragsquare.clone());
    }


    for(var i = 0; i < rows; i++){
            $("#wrapper").append($onerow.clone());
    }

    for(var i = 0; i < columns; i++){
            $(".onerow").append($square.clone());
    }


    $(function () {
        // A chaque sélection de fichier
        $('#my_form').find('input[name="userfile"]').on('change', function (e) {
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
                $image_preview.find('.caption p:first').html(file.size +' bytes');
            }
        });

        // Bouton "Annuler" pour vider le champ d'upload
        $('#image_preview').find('button[type="button"]').on('click', function (e) {
            e.preventDefault();

            $('#my_form').find('input[name="userfile"]').val('');
            $('#image_preview').find('.thumbnail').addClass('hidden');
        });
    });

$(".dragsquare").draggable({

snap: ".square"

})

$(".square").droppable();



});
