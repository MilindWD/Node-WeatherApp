//importing
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//paths for configs
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialDir = path.join(__dirname, '../templates/partials');

//Setup HandleBars engine and Views location
app.set('view engine','hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialDir);

//Setup static directory
app.use(express.static(publicDir));

//Routes
app.get('', (req,res) => {
    res.render('index',{
        title: 'Welcome',
        name: 'Me'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: "helpppppp",
        name: "Me"
    });
});



app.get('/about', (req,res)=> {
    res.render('about', {
        title: "About Express",
        name: "Me"
    })
});


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "provide address"
        });
    }
    geocode(req.query.address, (geocode_error, {latitude, longitude, location} = { }) => {
        if(geocode_error) {
            return res.send({
                error: geocode_error
            });
        }
        forecast(latitude, longitude, (forecast_error, forecast_data) => {
            if(forecast_error){
                return res.send({
                    error: forecast_error
                });
            }
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecast_data,
            });
        });
    });
});

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "no search term provided"
        });
    }
    res.send({

        products: [req.query.search]
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Error',
        details: 'requested help article not found',
        name: 'Me'
    })
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Error',
        details: 'Page not found',
        name: 'Me'
    })
});

app.listen(3000, ()=>{
    console.log('start');
});

