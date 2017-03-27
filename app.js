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

    var randomFont = fontsArray[Math.floor(Math.random() * fontsArray.length)];
    console.log(randomFont);     

    var WebFontConfig = {
        google: {
            families: randomFont
        },
        fontloading: function(familyName, fvd) {
            //console.log(familyName);
            switchButtons(familyName);
        }
    }
    WebFont.load(WebFontConfig);  
    });

    var buttons = $('.switch_button_one, .switch_button_two, .switch_button_three, .switch_button_four');
    var titles = $('.title_one, .title_two, .title_three, .title_four');
    var paragraphs = $('.paragraph_one, .paragraph_two, .paragraph_three, .paragraph_four');

    function switchButtons(font){
        $(buttons).click(function(){ 
            //alert('Works!'); 
            $(titles).css('font-family', font);
            $(paragraphs).css('font-family', font);
        });
    }
});