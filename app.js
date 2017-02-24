$(function(){

    var googleFontUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBxzFarVQQ7DZrN8SDz4wMuikwd4Abx51w';

    function getData(searchTerm, callback){
        var query = {
            sort: 'popularity'
        }
        $.getJSON(googleFontUrl, query, callback);

    }

    function renderSearchData(data){
        //alert('Test Submit Button');
        var results = '<li>' + 'No results. Try Again.' + '</li>';

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
        $('.fonts').html(results);
    }

    function submit(){
        $('form').submit(function(event){
            event.preventDefault();
            var searchTerm = $(this).find('.query_search').val();
            getData(searchTerm, renderSearchData);
        });
    }

    submit();

});

$(document).ready(function(){
     $('.foo, .bar').css({
        fontsize: '600px',
        color: 'red'
    });
});

let WebFontConfig = {
    google: { 
        families: ['Pangolin'] 
    },
    timeout: 2000 /* font request abadoned if longer than 2 seconds */
};

(function(){
    let wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.async = 'true';
    document.head.appendChild(wf);
})();

document.getElementById('switch-button').addEventListener('click', function () {
    if (document.documentElement.className.indexOf('wf-active') > -1) {
        document.documentElement.className = '';
    } else {
        document.documentElement.className = 'wf-active';
    }
});
