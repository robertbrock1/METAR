/**
 * @author robertbrock
 */
//Webservice XML
function getMETAR(ICAO, callback){

	var request = require('request');
	request('http://weather.aero/dataserver_current/httpparam?datasource=metars&requestType=retrieve&format=xml&mostRecentForEachStation=constraint&hoursBeforeNow=24&stationString='+ICAO, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var XmlDocument = require('xmldoc').XmlDocument;
			var results = new XmlDocument(body);
			//console.log(body);
			exports.station_id = results.valueWithPath("data.METAR.icao_code");
			exports.observation_time = results.valueWithPath("data.METAR.observation_time");
			exports.latitude = results.valueWithPath("data.METAR.latitude");
			exports.longitude = results.valueWithPath("data.METAR.longitude");
			exports.temp_c = results.valueWithPath("data.METAR.temp_c");
			exports.dewpoint_c = results.valueWithPath("data.METAR.dewpoint_c");
			exports.wind_dir_degrees = results.valueWithPath("data.METAR.wind_dir_degrees");
			exports.wind_speed_kt = results.valueWithPath("data.METAR.wind_speed_kt");
			exports.wind_gust_kt = results.valueWithPath("data.METAR.wind_gust_kt");
			visibility_statute_mi = results.valueWithPath("data.METAR.visibility_statute_mi");
			if (visibility_statute_mi<6.21)
										{
											exports.visibility_statute_m=Math.round(visibility_statute_mi*1609.344);
										} else
										{
											exports.visibility_statute_m = 9999;
										};
			exports.altim_in_hg = Math.round(results.valueWithPath("data.METAR.altim_in_hg") *33.86);
			exports.sea_level_pressure_mb = results.valueWithPath("data.METAR.sea_level_pressure_mb");
			exports.quality_control_flags = results.valueWithPath("data.METAR.quality_control_flags");
			exports.wx_string = results.valueWithPath("data.METAR.wx_string");
			exports.sky_cover = results.valueWithPath("data.METAR.sky_condition@sky_cover");
			exports.cloud_base_ft_agl = results.valueWithPath("data.METAR.sky_condition@cloud_base_ft_agl");
			exports.flight_category = results.valueWithPath("data.METAR.flight_category");
			exports.three_hr_pressure_tendency_mb = results.valueWithPath("data.METAR.three_hr_pressure_tendency_mb");
			exports.maxT_c = results.valueWithPath("data.METAR.maxT_c");
			exports.minT_c = results.valueWithPath("data.METAR.minT_c");
			exports.maxT24hr_c = results.valueWithPath("data.METAR.maxT24hr_c");
			exports.minT24hr_c = results.valueWithPath("data.METAR.minT24hr_c");
			exports.precip_in = results.valueWithPath("data.METAR.precip_in");
			exports.pcp3hr_in = results.valueWithPath("data.METAR.pcp3hr_in");
			exports.pcp6hr_in = results.valueWithPath("data.METAR.pcp6hr_in");
			exports.pcp24hr_in = results.valueWithPath("data.METAR.pcp24hr_in");
			exports.snow_in = results.valueWithPath("data.METAR.snow_in");
			exports.vert_vis_ft = results.valueWithPath("data.METAR.vert_vis_ft");
			exports.metar_type = results.valueWithPath("data.METAR.metar_type");
			exports.elevation_m = results.valueWithPath("data.METAR.elevation_m");

			//callback function
			callback(null, exports.station_id,
							exports.observation_time,
							exports.latitude,
							exports.latitude,
							exports.longitude,
							exports.temp_c,
							exports.dewpoint_c,
							exports.wind_dir_degrees,
							exports.wind_speed_kt,
							exports.wind_gust_kt,
							exports.visibility_statute_mi,
							exports.visibility_statute_m,
							exports.altim_in_hg,
							exports.sea_level_pressure_mb,
							exports.quality_control_flags,
							exports.wx_string,
							exports.sky_cover,
							exports.cloud_base_ft_agl,
							exports.flight_category,
							exports.three_hr_pressure_tendency_mb,
							exports.maxT_c,
							exports.minT_c,
							exports.maxT24hr_c,
							exports.minT24hr_c,
							exports.precip_in,
							exports.pcp3hr_in,
							exports.pcp6hr_in,
							exports.pcp24hr_in,
							exports.snow_in,
							exports.vert_vis_ft,
							exports.metar_type,
							exports.elevation_m
);
		}
	})
}
exports.getMETAR =getMETAR;
