import Vue from 'vue';

const getWeatherByCity = (city) => `http://api.openweathermap.org/data/2.5/weather?appid=dc884d8347e8b27fc4bbbc265f2e9d3c&q=${city}`;
const kelvinOffset = 273.15;

var mount = new Vue({
    el: '#mount',
    data: {
        cityName:"",
        temperature:"",
        humidity:""
    },
    methods: {
        fetchWeather: function (cityName:string) {
            //preserve current scope of 'this' so temperature and humidity can be accessed in callback functions
            var functionScope = this;
            if (cityName.length > 0) {
                fetch(getWeatherByCity(cityName))
                    .then(function(response:any) {
                        return response.json();
                    })
                    .then(function(results:any) {
                        //city data not found
                        if (results.cod && results.cod == 404) {
                            alert("'" + cityName + "' is not a valid city name.");

                            //clear results
                            functionScope.temperature = "";
                            functionScope.humidity = "";
                        //city data found
                        } else {
                            //convert Kelvin to Fahrenheit
                            let kelvinTemp = results.main.temp;
                            var fahrenheitTemp = Math.round((kelvinTemp - kelvinOffset) * (9/5) + 32);

                            //set result variables
                            functionScope.temperature = fahrenheitTemp.toString() + "°F";
                            functionScope.humidity = results.main.humidity + "%";
                        }
                    })
            } else {
                alert("Please enter a city name.");

                //clear result variables
                functionScope.temperature = "";
                functionScope.humidity = "";
            }
        }
    }
})