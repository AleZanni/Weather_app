const request = require('request');
const forecast = (longitude, latitude, callback)=> {
    const urlForecast = `https://api.darksky.net/forecast/3ae0ac2d4e7f69e5a403af2138265554/${longitude},${latitude}?units=si`;
    
    request({ url: urlForecast, json: true}, (error, {body})=>{
        if(error){
        callback(`Unable to retrive data!`, undefined);
        } else if(body.error) {
            callback(`Unable to find location!`, undefined);
        }else {
        callback(undefined, {
           summary: body.daily.data[0].summary,
            temperature: body.currently.temperature,
            precipProbability: body.currently.precipProbability
        })
    }
    })
    };

    module.exports = forecast