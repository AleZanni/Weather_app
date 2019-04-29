const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const temperature = require('./utils/temperature');
const summary = require('./utils/summary')

const app = express();
const port = process.env.PORT || 3000
//Define paths to express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, './templates/views');
const partialPath = path.join(__dirname, './templates/partials');
//Setup handlebars engines and view config
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Alessandro Zanni'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'Alessandro Zanni'
    })
});

app.get('/help',(req, res)=> {
    res.render('help', {
    title: 'Help page', 
    name: 'Alessandro Zanni'
})
});
//Implementing geocode and forecast
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'An address must be provided'});
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, dataForecast) => {
        if(error){
            return res.send({ error });
        }
        temperature(latitude, longitude, (error, dataTemp)=>{
            if(error){
                return res.send({ error });
            }
        summary(latitude, longitude, (error, dataSum)=>{
            res.send({
                location,
                dataForecast,
                address: req.query.address,
                dataTemp,
                dataSum
        })

        })

        })
          });
        });
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        error: '404 Help page not found!'
    });
})

app.get('*', (req, res) =>{
    res.render('404', {
        error: '404 page not found!'
    });
})

app.listen(port, ()=>{
    console.log('Server is up to port' + port);
})