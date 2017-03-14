$(function(){
    //console.log(WebFont);//

    var googleFontUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBxzFarVQQ7DZrN8SDz4wMuikwd4Abx51w';

    $.getJSON(googleFontUrl, function(data) {
        var getArray = data.items;
        // console.log(getArray);
        for (var i = 0; i < getArray.length; i++) {
            var getFamilies = getArray[i]['family'];
            var getFiles = getArray[i]['files'];
            // console.log(getFamilies);
            // console.log(getFiles);
            WebFont.load({
                google: {
                    families: ['Diplomata SC', 'Lato'] // not working //
                }
            });        
        //var pushFamilies = WebFont.google.families.push(getFamilies);//
        //var randomFamily = Math.floor(Math.random()*getFamilies.length);//
        //console.log(pushFamilies);//
        }
    });
    $('.switch_button_one').click(function(){
        //alert('Fuck me! It works!');//
        $('.title_one').css('font-family', 'Diplomata SC'); // getFamlies not working //
        $('.paragraph_one').css('font-family', 'Lato'); // getFamilies not working //
    });

});

    


    /* function renderSearchData(data){
        //alert('Test Submit Button');

        function getData(){
        var query = {
            sort: 'popularity'
        }
        $.getJSON(googleFontUrl, query);
    }
        
        // nest this function with line 61 function //        
        // developer.telerik //
        // google: { [] } family will be a variable //
        /* var WebFontConfig = {
            google: { 
                var FontFamilies = [];  
            },
            timeout: 2000 // font request abadoned if longer than 2 seconds //
        }; 
        //console.log(data);//
        var getItems = data.items;
        //console.log(getItems);//
        for (var i = 0; i < getItems.length; i++) {
            //console.log(getItems[i]['category']);//
            var eachItemCat = getItems[i]['category'];
            var eachItemFam = getItems[i]['family'];
            var eachItemFile = getItems[i]['files'].regular;
            console.log(eachItemCat);
            console.log(eachItemFam);
            console.log(eachItemFile);            
        }
        $('.font_pair').html(results);
    }

    function submit(){
        $('switch_button').submit(function(event){
            event.preventDefault();
            getData(renderSearchData);
        });
    }

    submit();
});



/* // CSS jQUERY //
$(document).ready(function(){
     $('.foo, .bar').css({
        fontsize: '200px',
        color: 'red'
    });
});

// developer.telerik //

// asynchronous approach //
 webFont.load({
    google: {
        families: []
    }
});

var WebFontConfig = {
    google: { 
        families: eachItemFam
    },
    timeout: 2000 // font request abadoned if longer than 2 seconds //
}; 

(function(){
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.async = 'true';
    document.head.appendChild(wf);
})();

// vanilla JS //
document.getElementById('switch-button').addEventListener('click', function () {
    if (document.documentElement.className.indexOf('wf-active') > -1) {
        document.documentElement.className = '';
    } else {
        document.documentElement.className = 'wf-active';
    }
}); */