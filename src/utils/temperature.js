const request = require('request');
const temp = (longitude, latitude, callback)=> {
    const urltemp = `https://api.darksky.net/forecast/3ae0ac2d4e7f69e5a403af2138265554/${longitude},${latitude}?units=si`;
    
    request({ url: urltemp, json: true}, (error, {body})=>{
        if(error){
        callback(`Unable to retrive data!`, undefined);
        } else if(body.error) {
            callback(`Unable to find location!`, undefined);
        }else {
        callback(undefined, body.currently.temperature
        )
    }
    })
    };

    module.exports = temp