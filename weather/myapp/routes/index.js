var response = require('./requestMapping')

// home search page
exports.index = function(req, res){
  res.render('index', { stationDisplay: response.station_id, test: 'rob' });
};

/*
//post from form to call METAR service
exports.post('/', function(req, res){
    response.getMETAR(req.body.query, function(err, station_id){
        res.render('results', {stationDisplay: response.station_id, test: 'rob'});
    });
});
*/

exports.view = ('/results', function(req, res) {
    res.send('query: ' + req.body.query);
});

