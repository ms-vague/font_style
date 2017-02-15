$(function(){

    var googleFontUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBxzFarVQQ7DZrN8SDz4wMuikwd4Abx51w';

    function getData(searchTerm, callback){
        var query = {
            s: searchTerm,  
            r: 'json'
        }
        $.getJSON(googleFontUrl, query, callback);

    }

    function renderSearchData(data){
        //alert('Test Submit Button');
        var results = '<li>' + 'No results. Try Again.' + '</li>'

        //console.log(data);//
        var getItems = data.items;
        //console.log(getItems);//
        for (var i = 0; i < getItems.length; i++) {
            console.log(getItems[i]);
        }

        $('.fonts').html(results);
    }

    function submit(){
        $('form').submit(function(event){
            event.preventDefault();
            var searchTerm = $('.query_search').val();
            getData(searchTerm, renderSearchData);
        });
    }

    submit();

});