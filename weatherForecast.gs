function createWeatherReport() {
  // current report for desired zip code,
  // sent to your phone via MMS

  var address = "your Zip Code";
  var MMSAddress = "your phone's MMS Address";

  var currentTime = new Date();
  
  var response = UrlFetchApp.fetch("http://api.wunderground.com/api/d62da0c914d13240/forecast/hourly/q/" + address + ".json");
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  // look into hourly json data...
  var reelFeel = data.hourly_forecast[1].feelslike.metric;
  var todaysHigh = data.forecast.simpleforecast.forecastday[0].high.celsius;
  var todaysLow = data.forecast.simpleforecast.forecastday[0].low.celsius;
  var todaysPOP = data.forecast.txt_forecast.forecastday[0].pop;
  var tonightsPOP = data.forecast.txt_forecast.forecastday[1].pop; 
 
  var todaysForecast = "currently:" + reelFeel + "C, \n high:" + todaysHigh + "C, \n low:" + todaysLow + "C, \n daytimePOP:" + todaysPOP + "%, \n nightPOP:" + tonightsPOP + "%"; 
  
  GmailApp.sendEmail(MMSAddress, currentTime, todaysForecast); 
  
}

function sendForecast() {
  var currentTime = new Date();
  var currentDay = currentTime.getDay();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();
  
  var monWedFri = {1:1, 3:1, 5:1};
  var tuesThur = {2:1, 4:1};
  var weekend = {6:1, 7:1};
  
  if (currentDay in monWedFri && currentHour == 9 && currentMinute == 2 ) {
    createWeatherReport();
  } else if ( currentDay in weekend && currentHour == 11 && currentMinute == 0) {
    createWeatherReport();
  } else if ( currentDay in tuesThur && currentHour == 10 && currentMinute == 2 ) {
    createWeatherReport();
  }
}