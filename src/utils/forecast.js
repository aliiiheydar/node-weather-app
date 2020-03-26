const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `https://api.darksky.net/forecast/ffe5a94203a7c304bc3cf7b680d48933/${latitude},${longitude}?units=si`
    request({url , json:true},(err,{body}={})=>{
        if (err) {
            callback('Unable to connect to weather service!',undefined)
        }else if (body.error) {
            callback('Location not found!',undefined)
        }else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${Math.round(body.currently.precipProbability * 100)} % chance of rain.`)
        }
    })
}

module.exports = forecast