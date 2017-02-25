$(function(){

    var googleFontUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBxzFarVQQ7DZrN8SDz4wMuikwd4Abx51w';

    function getData(){
        var query = {
            sort: 'popularity'
        }
        $.getJSON(googleFontUrl, query);

    }

    function renderSearchData(data){
        //alert('Test Submit Button');
        
        // nest this function with line 61 function //        
        // developer.telerik //
        let WebFontConfig = {
            google: { 
                var families =  // family will be a variable //
        },
            timeout: 2000 /* font request abadoned if longer than 2 seconds */
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
        $('').html(results);
    }

    function submit(){
        $('switch-button').submit(function(event){
            event.preventDefault();
            getData(renderSearchData);
        });
    }

    submit();

});

// CSS jQUERY //
$(document).ready(function(){
     $('.foo, .bar').css({
        fontsize: '600px',
        color: 'red'
    });
});

// developer.telerik //
var WebFontConfig = {
    google: { 
        families: ['Pangolin'] 
    },
    timeout: 2000 /* font request abadoned if longer than 2 seconds */
};

//  //
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
});
