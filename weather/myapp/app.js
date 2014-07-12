
/**
 * Module dependencies.
 */
var sys = require('sys');

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  var response = require('./routes/requestMapping')

var app = express ();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/users', user.list);

app.get('/analytics', function(req, res){
  res.render('analytics', { query: req.body.query });
});


//handle incoming SMS
app.post('/incoming', function(req, res) {
var message = req.body.Body;
var from = req.body.From;
sys.log('From: ' + from + ', Message: ' + message);

               var twiml = '<?xml version="1.0" encoding="UTF-8" ?>n<Response>n<Sms>Thanks for your text, well be in touch.</Sms>n</Response>';

               res.send(twiml, {'Content-Type':'text/xml'}, 200);
});

/*
app.post('/', routes.post);
*/

app.post('/', function(req, res){
    response.getMETAR(req.body.query, function(err, station_id){
        res.render('results', {	stationDisplay: response.station_id, 	
								timeDisplay: response.observation_time, 
								tempDisplay: response.temp_c, 
								dewDisplay: response.dewpoint_c, 
								windSpeedDisplay: response.wind_speed_kt, 
								windDirectionDisplay: response.wind_dir_degrees,
								visDisplay: response.visibility_statute_m,
								QNHDisplay : response.altim_in_hg,
								visSkyCover: response.sky_cover,
								visCloudHeight: response.cloud_base_ft_agl});
    });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
