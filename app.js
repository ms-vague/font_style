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
        //console.log(typeof fontsArray);    
        //console.log(typeof joined); 

    
    //console.log(oneFont);     

    var WebFontConfig = {
        google: {
            families: getRandomFont(fontsArray)   // one random font array 
        },
        fontloading: function(familyName, fvd) {   // takes array and breaks it up into separate font strings
            //console.log(familyName);
            switchStyle(familyName);
        }
    }
    $('.switch_button_one').click(function() {
        WebFont.load(WebFontConfig);
    });  
    });

    /*var buttons = $('.switch_button_one, .switch_button_two, .switch_button_three, .switch_button_four');*/
    /*var titles = $('.title_one, .title_two, .title_three, .title_four');*/
    /*var paragraphs = $('.paragraph_one, .paragraph_two, .paragraph_three, .paragraph_four');*/

    function getRandomFont(fontArray) {
        var min = 1;
        var max = fontArray.length;
        var randomFont = fontArray[Math.floor(Math.random() * (max - min + 1)) + min];
        //console.log(randomFont);
        return randomFont;
    }

    function switchStyle(font){
        $('.title_one').css('font-family', font);
        /* add the rest of CSS stuff here */
    }
});