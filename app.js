$(function(){
    
    var googleFontUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBxzFarVQQ7DZrN8SDz4wMuikwd4Abx51w';

    $.getJSON(googleFontUrl, function(data) {
        var getArray = data.items;
        var fontsArray = [];
        var filesArray = [];
        for (var i = 0; i < getArray.length; i++) {
            fontsArray.push(getArray[i]['family']);
            filesArray.push(getArray[i]['files']['regular']);
        } 
        //console.log(fontsArray);    
        //console.log(typeof joined);

    var WebFontConfig = {
        google: {
            families: fontsArray
        },
        fontloading: function(familyName, fvd) {
            console.log(familyName, fvd);
        }
    }    
    WebFont.load(WebFontConfig);  

    function switchButtons(){
        $('.switch_button_one').click(function(){
            $('.title_one').css('font-family', 'something'); 
            $('.paragraph_one').css('font-family', 'something');
        });
        $('.switch_button_two').click(function(){
            $('.title_two').css('font-family', 'something');
            $('.paragraph_two').css('font-family', 'something');
        });
        $('.switch_button_three').click(function(){
            $('.title_three').css('font-family', 'something'); 
            $('.paragraph_three').css('font-family', 'something');
        });
        $('.switch_button_four').click(function(){
            $('.title_four').css('font-family', 'something'); 
            $('.paragraph_four').css('font-family', 'something');
        });
        }
        switchButtons();
    });
});