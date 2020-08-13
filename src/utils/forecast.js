const request = require('request')


const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5fabb6bf799ecb75dba95ac035338df1&query=' + latitude + ',' + longitude + '&units=f'

    //const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnRnaWI2MyIsImEiOiJja2Q5azBpMW8wZmlqMnlzZ3JzcThyMXp1In0.8dtyb3FlfCDVrJPjlaaymQ&limit=1'
    request({url, json:true} , (error,{body}={}) =>{
    
      if (error) {
                   callback('Unable to connect to weather services!', undefined)
      } else if (body.error) {
                    callback('Unable to find location!', undefined)
      } else { callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')}
    
    })
    }
    
    module.exports = forecast