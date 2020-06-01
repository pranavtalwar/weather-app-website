const request = require('request')
const dotenv = require('dotenv')

dotenv.config()

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=" + process.env.WEATHERSTACK_KEY + "&query=" + latitude + "," + longitude +"&units=f"

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const weatherDescription = body.current.weather_descriptions[0]
            callback(undefined, weatherDescription + '. It is currently ' + temp + ' degrees out. It feels like ' + feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast