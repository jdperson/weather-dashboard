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
                $("#today").text(data.name + " (" + date + ")");

                var temp = parseInt(data.main.temp);
                $("#today-temp").text("Temp: " + temp + "°F");

                $("#today-wind").text("Wind: " + data.wind.speed + " MPH");

                $("#today-humid").text("Humidity: " + data.main.humidity + "%");
            })

            var fiveURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=" + myKey;

            fetch(fiveURL).then(function (response) {
                return response.json();
            }).then( function (data) {
                console.log(data);
                console.log(data.list[8].dt);
                for (i = 0; i < 5; i++) {
                    for (j = 0; j < 5; j++) {
                        var date = dayjs.unix(data.list[j * 8].dt).format("MM/DD/YYYY");

                        // ! Not displaying properly
                        $(".card-container").find(".5day-date").eq(i).text(date);
                        $(".card-container").find(".5day-temp").eq(i).text(data.list[j * 8].main.temp)
                        $(".card-container").find(".5day-wind").eq(i).text(data.list[j * 8].wind.speed + "MPH");
                        $(".card-container").find(".5day-humid").eq(i).text(data.list[j * 8].main.humidity + "%");
                        var condition = data.list[j * 8].weather.main;
                        switch (condition) {
                            case "Clear":
                                $(".card-container").find(".5day-condition").eq(i).text("🌞");
                                break;
                            case "Clouds":
                                $(".card-container").find(".5day-condition").eq(i).text("⛅");
                                break;
                            case "Rain":
                                $(".card-container").find(".5day-condition").eq(i).text("☁️");
                                break;
                            case "Drizzle":
                                $(".card-container").find(".5day-condition").eq(i).text("🌧️");
                                break;
                            case "Thunderstorm":
                                $(".card-container").find(".5day-condition").eq(i).text("⛈️");
                                break;
                            case "Snow":
                                $(".card-container").find(".5day-condition").eq(i).text("❄️");
                                break;
                            case "Mist":
                                $(".card-container").find(".5day-condition").eq(i).text("🌫️");
                                break;
                            case "Smoke":
                                $(".card-container").find(".5day-condition").eq(i).text("🌋");
                                break;
                            case "Haze":
                                $(".card-container").find(".5day-condition").eq(i).text("🌫️");
                                break;
                            case "Dust":
                                $(".card-container").find(".5day-condition").eq(i).text("🌪️");
                                break;
                            case "Fog":
                                $(".card-container").find(".5day-condition").eq(i).text("🌫️");
                                break;
                            case "Sand":
                                $(".card-container").find(".5day-condition").eq(i).text("🌪️");
                                break;
                            case "Ash":
                                $(".card-container").find(".5day-condition").eq(i).text("🌋");
                                break;
                            case "Squall":
                                $(".card-container").find(".5day-condition").eq(i).text("🌬️");
                                break;
                            case "Tornado":
                                $(".card-container").find(".5day-condition").eq(i).text("🌪️");
                                break;
                            default:
                                break;                                                                                                                                                                                                                                                                                                                                                                                                                       
                        }                       
                    }
                }

                // TODO: Write code that adds and saves search history
            })
        })
    })
})