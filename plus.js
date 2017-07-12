
var id= $(this).attr("id");
var idint= parseInt(id);


$("#"+(idint+1)).css('backgroundColor', color);
$("#"+(idint-1)).css('backgroundColor', color);
$("#"+(idint+32)).css('backgroundColor', color);
$("#"+(idint-32)).css('backgroundColor', color);
