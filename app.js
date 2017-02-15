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
        var results = '<li>' + 'No results. Try Again.' + '</li>';

        //console.log(data);
        //console.log(data.items.splice(0, 99));
        /*if (data.items) {
            firstItems = data.items.splice(0, 70); 
            results = firstItems.map(function(item){
                return '<li>' + item.family + '</li>';
            })
        }*/
        
        searchData = data.items.splice(0, 99);
        if (searchData) {
            //console.log(data);
            results = searchData.map(function(item){
                return '<li>' + item.family + '</li>';
            });
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