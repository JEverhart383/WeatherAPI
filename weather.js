var http = require("http");
var https = require("https");


var forcastURL = "https://api.forecast.io/forecast/f1df3ac2596bc85d5c1cc9d1bdd13109/";
var url = "http://maps.googleapis.com/maps/api/geocode/json?address=1815+Woodland+Trail,+Farmville,+VA+23901";

function getWeather(lat, long){

	https.get(forcastURL+lat+","+long, function(response){
		var forecast = "";
	
	
			response.on("data", function(chunk){
				forecast += chunk;

			});

			response.on("end", function(){
				if(response.statusCode === 200){

					var weekForecast = JSON.parse(forecast);
					console.log(weekForecast);
					console.log(typeof(weekForecast));
				}	
			});

	});		
}
	
var request = http.get(url, function(response){
	var body = "";
	
	
	response.on("data", function(chunk){
		body += chunk;

	});

	response.on("end", function(){
		if(response.statusCode === 200){

			try{
				var geocode = JSON.parse(body);
				var latitude = geocode.results[0].geometry.location.lat;
				var longitude = geocode.results[0].geometry.location.lng;

				getWeather(latitude,longitude);

				//console.log( latitude + " " + longitude);
			} catch(error){
				//printError(error);

			}
		} else {
		
			
		}	
	});

}); 
