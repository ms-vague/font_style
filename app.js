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
         
    function makeWebFontConfig() { 
        return {
            google: {
                families: getRandomFont(fontsArray)   // one random font array 
            },
            fontloading: function(familyName, fvd) {   // takes array and breaks it up into separate font strings
                //console.log(familyName);
                switchTitleStyle(familyName);
                /*switchParagraphStyle(familyName);*/
            }
        }
    } 
     $('.switch_title_one, .switch_title_two, .switch_title_three, .switch_title_four').click(function() { 
        $(this).data('clicked', true);
        WebFont.load(makeWebFontConfig());
        });
    });

    function getRandomFont(fontArray) {
        //console.log(fontArray);
        var min = 1;
        var max = fontArray.length;
        var randomFont = [];
        randomFont.push(fontArray[Math.floor(Math.random() * (max - min + 1)) + min]);
        //console.log(randomFont);
        return randomFont;
    }
});