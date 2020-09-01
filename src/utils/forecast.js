const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3cb0e274d3fd6a6118ca6fc7a7e473fe&query=${lat},${lon}`;
    request({url, json: true}, (error, {body} = { }) => {
        if(error){
            callback('Unable to connect to weather services', undefined);
        }
        else if(body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            callback(undefined, `${body.current.weather_descriptions[0]}, temperature is ${body.current.temperature} feels like ${body.current.feelslike}`);
        }
    });
}

module.exports = forecast;