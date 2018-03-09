var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());

app.post('/check', function (req, res) {
  var id =req.param('id');
  var password = req.param('password');
  var apiKey = req.webtaskContext.secrets.WEATHER_KEY
  var city = req.param('city');
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

if(id === 'femi' && password === 'femi'){
request(url, function (err, response, body) {
    if(err){
      res.json({error: 'Error in api call'});
    } else {
      var api_body = JSON.parse(body)
        res.json({weather: `Humidity is ${api_body.main.humidity} and temperature will be ${api_body.main.temp}`});
      }
  });
}else{
  res.send('Bad username or password');
}
});

module.exports = Webtask.fromExpress(app);
