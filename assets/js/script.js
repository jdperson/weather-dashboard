$(document).ready( function () {
    // TODO: Write code that prints saved search history

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var myKey = "bbec85a850de09f3c621223d7a8454e1";

        var input = $("input").val().replaceAll(" ", "");

        var coordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" +
                  input + "&limit=1&appid=" + myKey;
        
        fetch(coordURL, {
            cache: "reload",
        }).then( function (response) {
            return response.json();
        }).then( function (data) {
            var todayURL = "https://api.openweathermap.org/data/2.5/weather?lat=" +
                      data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=" + myKey;
            
            fetch(todayURL).then( function (response) {
                return response.json();
            }).then( function (data) {
                console.log(data);
                
                var date = dayjs.unix(data.dt).format("MM/DD/YYYY");
                var temp = parseInt(data.main.temp);
                var condition = data.weather[0].main;

                $("#today").text(data.name + " (" + date + ")");
                $("#today-temp").text("Temp: " + temp + "°F");
                $("#today-wind").text("Wind: " + data.wind.speed + " MPH");
                $("#today-humid").text("Humidity: " + data.main.humidity + "%");

                switch (condition) {
                    case "Clear":
                        $("#today").append("🌞");
                        break;
                    case "Clouds":
                        $("#today").append("⛅");
                        break;
                    case "Rain":
                        $("#today").append("☁️");
                        break;
                    case "Drizzle":
                        $("#today").append("🌧️");
                        break;
                    case "Thunderstorm":
                        $("#today").append("⛈️");
                        break;
                    case "Snow":
                        $("#today").append("❄️");
                        break;
                    case "Mist":
                        $("#today").append("🌫️");
                        break;
                    case "Smoke":
                        $("#today").append("🌋");
                        break;
                    case "Haze":
                        $("#today").append("🌫️");
                        break;
                    case "Dust":
                        $("#today").append("🌪️");
                        break;
                    case "Fog":
                        $("#today").append("🌫️");
                        break;
                    case "Sand":
                        $("#today").append("🌪️");
                        break;
                    case "Ash":
                        $("#today").append("🌋");
                        break;
                    case "Squall":
                        $("#today").append("🌬️");
                        break;
                    case "Tornado":
                        $("#today").append("🌪️");
                        break;
                    default:
                        break;                                                                                                                                                                                                                                                                                                                                                                                                                       
                    }
            })

            var fiveURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=" + myKey;

            fetch(fiveURL).then(function (response) {
                return response.json();
            }).then( function (data) {
                console.log(data);
                console.log(data.list[8].dt);

                $("#card-container .card").each(function (i) {
                    var date = dayjs.unix(data.list[i * 8].dt).format("MM/DD/YYYY");
                    var temp = "Temp: " + parseInt(data.list[i * 8].main.temp) + "°F";
                    var wind = "Wind: " + data.list[i * 8].wind.speed + " MPH";
                    var humidity = "Humidity: " + data.list[i * 8].main.humidity + "%"
                    var condition = data.list[i * 8].weather[0].main;

                    $(this).find(".5day-date").text(date);
                    $(this).find(".5day-temp").text(temp);
                    $(this).find(".5day-wind").text(wind);
                    $(this).find(".5day-humid").text(humidity);
                    
                    switch (condition) {
                        case "Clear":
                            $(this).find(".5day-condition").text("🌞");
                            break;
                        case "Clouds":
                            $(this).find(".5day-condition").text("⛅");
                            break;
                        case "Rain":
                            $(this).find(".5day-condition").text("☁️");
                            break;
                        case "Drizzle":
                            $(this).find(".5day-condition").text("🌧️");
                            break;
                        case "Thunderstorm":
                            $(this).find(".5day-condition").text("⛈️");
                            break;
                        case "Snow":
                            $(this).find(".5day-condition").text("❄️");
                            break;
                        case "Mist":
                            $(this).find(".5day-condition").text("🌫️");
                            break;
                        case "Smoke":
                            $(this).find(".5day-condition").text("🌋");
                            break;
                        case "Haze":
                            $(this).find(".5day-condition").text("🌫️");
                            break;
                        case "Dust":
                            $(this).find(".5day-condition").text("🌪️");
                            break;
                        case "Fog":
                            $(this).find(".5day-condition").text("🌫️");
                            break;
                        case "Sand":
                            $(this).find(".5day-condition").text("🌪️");
                            break;
                        case "Ash":
                            $(this).find(".5day-condition").text("🌋");
                            break;
                        case "Squall":
                            $(this).find(".5day-condition").text("🌬️");
                            break;
                        case "Tornado":
                            $(this).find(".5day-condition").text("🌪️");
                            break;
                        default:
                            break;                                                                                                                                                                                                                                                                                                                                                                                                                       
                        }
                    });

                // TODO: Write code that adds and saves search history
            })
        })
    })
})