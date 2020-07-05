
$(document).ready(function () {
    console.log("hello world")
    var listOfSearchedCities = []; 
    var index = 0; 
    while(localStorage.getItem(index) != undefined){
        listOfSearchedCities.push(localStorage.getItem(index));
        var button = $("<li>");
        button.text(localStorage.getItem(index));
        button.attr("class", "list-group-item")
        button.click(function(){
            var addedCity = $(this).text(); 
            $("#city-search").val(addedCity); 
        }); 
        $(".cities-list").append(button);
        index++; 
    }

    $("#city-location").on("click", function () {

        var nameOfCity = $("#city-search").val();
        var button = $("<list>");
        button.attr("class", "list-group-item")
        button.text(nameOfCity);
        
        button.click(function(){
            var addedCity = $(this).text(); 
            $("#city-search").val(addedCity); 
        }); 
        if (listOfSearchedCities.indexOf(nameOfCity) == -1){
            localStorage.setItem(listOfSearchedCities.length, nameOfCity); 
            listOfSearchedCities.push(nameOfCity); 
            $(".cities-list").append(button);
        }
               
        var APIKey = "113dc44dfb1bfa2cccc9d9f80dbced34";
        var API_KEY = "27b2cedd2dfb2b4e4198640c8d09052b";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            nameOfCity + "&appid=" + APIKey;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + nameOfCity + "&units=imperial&appid=" + API_KEY;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)


                var time = moment().format("L");
                $("#time").text(time);

                $("#wind").text("wind: " + response.wind.speed + "MPH");
                var icon = response.weather[0].icon;
                console.log(icon)


                $("#icon").html(
                    `<img id="wicon" src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon" />`
                );


                $("#city").html("<h1>" + response.name + "Weather Details</h1>");
                $("#humidity").text("Humidity:" + response.main.humidity + "%");
                var temperatureF = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
                $("#tempF").text("Temp: " + temperatureF + " F\xB0");
                var longitude = response.coord.lon;
                var latitude = response.coord.lat;
               
                // 

                // 
                // console.log(queryURL);


                // $(".temperatureF").text("Temp (F): " + temperatureF.toFixed(2) + " °");
                // console.log("Wind speed: " + response.wind.speed);

                // console.log("Humidity: " + response.wind.speed);
                // console.log("Temp (F): " + temperatureF + "Degrees");
                var usURL = "";

                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${APIKey}`,
                    method: "GET"
                }).then(function(response){
                    $("#uv-index").text("UV Index: " + response.value);
                });;

               
            });
        $.ajax({
            url: forecastURL,
            method: "GET",

        }).then(function (response) {

            for (var i = 1; i < 6; i++){
                // image Url from api 
                var imageUrl =  response.list[i-1].weather[0].icon;
                imageUrl = `https://openweathermap.org/img/w/${imageUrl}.png`; 

                var currentCard = $('.card-city' + i).parent()
                console.log(currentCard)
                var currentImage = currentCard.find("img");
                console.log(currentImage)
                currentImage.attr("width", "30px")
                    .attr("height", "30px")
                    .attr("src", imageUrl);
                // humidity 
                var humidity = response.list[(i-1)].main.humidity + "%";
                // date 
                var date =  response.list[(i-1)].dt_txt; 
                var dayYearMonth = date.split(" ")[0]; 
                dayYearMonth = dayYearMonth.replaceAll("-", "/"); 
                dayYearMonth =  dayYearMonth.split("/"); // array of 3 values
                //console.log(date);
                //date = moment(date, "YYYY-MM-DD HH:MM:SS").format("MMM Do YY");  
                $('.card-title' + i).text(`${dayYearMonth[1]}/${dayYearMonth[2]}/${dayYearMonth[0]}`);

                // tempearture 
                var temp = parseInt(response.list[(i-1)].main.temp_max); 
                $('.card-text' + i).text(`Temp: ${temp}°F Humidity: ${humidity}`);
               
            }
            /*
            console.log(response)
            var forecastData1 = $('.temp-forecast');
            var forecastTemp1 =.main.temp;
            forecastData1.append("Temp (F°): " + forecastTemp1 + ' ');
            var forecastData2 =
            var forecastTemp2 = response.list[2].main.temp;
            forecastData2.append("Temp (F°): " + forecastTemp2 + ' ');
            var forecastData3 = $('.card-city3');
            var forecastTemp3 = response.list[3].main.temp;
            forecastData3.append("Temp (F°): " + forecastTemp3 + ' ');
            var forecastData4 = $('.card-city4');
            var forecastTemp4 = response.list[4].main.temp;
            forecastData4.append("Temp (F°): " + forecastTemp4 + ' ');
            var forecastData5 = $('.card-city5');
            var forecastTemp5 = response.list[5].main.temp;
            forecastData5.append("Temp (F°): " + forecastTemp5) + ' ';
            var forecastHumidity1 = $('.humidity-forecast');
            var forecastHumid1 = response.list[1].main.humidity;
            console.log(forecastHumid1)
            forecastHumidity1.append("Humidity: " + forecastHumid1 + "%")
            var forecastHumidity2 = $('.card-city2');
            var forecastHumid2 = response.list[2].main.humidity;
            forecastHumidity2.append("Humidity: " + forecastHumid2 + "%")
            var forecastHumidity3 = $('.card-city3');
            var forecastHumidity3 = response.list[3].main.humidity;
            forecastHumidity3.append("Humidity: " + forecastHumid3 + "%")
            var forecastHumidity4 = $('.card-city4');
            var forecastHumid4 = response.list[4].main.humidity;
            forecastHumidity4.append("Humidity: " + forecastHumid4 + "%")
            var forecastHumidity5 = $('.card-city5');
            var forecastHumid5 = response.list[5].main.humidity;
            // console.log(forecastHumid5)
            forecastHumidity5.append("Humidity: " + forecastHumid5 + "%")
            forecastDate = moment().format('MMMM Do YYYY, h:mm:ss a');
            console.log(forecastDate);
            */ 

        });
    });

});