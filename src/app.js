const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serv
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
 res.render('index', {
     title: 'Weather',
     name: 'Ramona Gibson'
 })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Ramona Gibson'
    })
   })

   app.get('/help', (req,res) => {
    res.render('help', {
    helpText: 'This is a help message.  Help is on the way!',
    title: 'Help',
    name: 'Ramona Gibson'
    })
   })

app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }


    
geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {

    if (error) {
      return res.send({error})
    }
  
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
  
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })

    })
})   

/*
   const forecastData = 'blah blah'

   res.send({
    location: location,
    forecast: forecastData,
    address: req.query.address
   })
})
*/

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    res.send({
            products: []
        })
})

app.get('/help/*', (req,res) => { 
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Ramona Gibson'
        })  
})

app.get('*', (req,res) => {    
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Ramona Gibson'
        })
})


//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
