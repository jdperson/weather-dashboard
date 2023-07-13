$(document).ready( function () {
    //loadHistory();

    var searchBtn = $("#searchBtn");
    searchBtn.onClick( function (event) {
        event.preventDefault();

        var input = $(this).closest("input").val();
        
        //configGeoAPI();
        //configOpenWeatherMapsAPI();
        //displayResults();
        //savetoHistory();
        //displayHistory();
    })
})