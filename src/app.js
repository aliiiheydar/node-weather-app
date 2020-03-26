const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req, res) => {
    res.render('index' ,{
        title: 'weather',
        name: 'Alireza'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Alireza'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alireza',
        msg: 'Here is where you can find some help!'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({error: 'You most provide a address!'})
    geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
        if (err) return res.send({error: err})
        forecast(latitude,longitude,(err,forecastData)=>{
            if (err) return res.send({error: err})
            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alireza',
        error: 'Help article not found!'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alireza',
        error: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})