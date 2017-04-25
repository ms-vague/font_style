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

    /*var buttons = $('.switch_title_one, .switch_title_two, .switch_title_three, .switch_title_four');*/
    /*var titles = $('.title_one, .title_two, .title_three, .title_four');*/
    /*var paragraphs = $('.paragraph_one, .paragraph_two, .paragraph_three, .paragraph_four');*/

    function getRandomFont(fontArray) {
        //console.log(fontArray);
        var min = 1;
        var max = fontArray.length;
        var randomFont = [];
        randomFont.push(fontArray[Math.floor(Math.random() * (max - min + 1)) + min]);
        //console.log(randomFont);
        return randomFont;
    }

    /*function switchTitleStyle(font){
      if ($('.switch_title_one').data('clicked')) {
          $('.title_one').css('font-family', font);
          }    
      else if ($('.switch_title_two').data('clicked')) {
          $('.title_two').css('font-family', font);
          }
      else if ($('.switch_title_three').data('clicked')) {    
          $('.title_three').css('font-family', font);
          }
      else {
          $('.title_four').css('font-family', font);
          }
    } */

    /*function switchParagraphStyle(font) {
      $('.switch_paragraph_one').click(function() {
        $('.paragraph_one').css('font-family', font);
      });
      $('.switch_paragraph_two').click(function() {
        $('.paragraph_two').css('font-family', font);
      });
      $('.switch_paragraph_three').click(function() {
        $('.paragraph_three').css('font-family', font);
      });
      $('.switch_paragraph_four').click(function() {
        $('.paragraph_four').css('font-family', font);
      });
    }*/
});