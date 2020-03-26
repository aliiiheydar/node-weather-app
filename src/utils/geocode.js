const request = require('request')

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxpaGV5ZGFyYXJhZmF0IiwiYSI6ImNrODFzM2N4ZjBjbG4zaGxtZzVyZ3I4bG4ifQ.0ovwARBtbpZB6-a1M0HgIA&limit=1`
    request({url , json:true},(err,{body}={})=>{
        if (err) {
            callback('Unable to connect map service!',undefined)
        }else if (body.features.length===0) {
            callback('Unable to find loacatin!',undefined)
        }else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode