var express = require('express')
    , morgan = require('morgan')
    , mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test');

var restaurantSchema = new mongoose.Schema({
    'name': String,
    'address.zipcode': String,
    'address.street': String,
    'address.building': String,
    'borough': String
});
var Restaurants = mongoose.model('Restaurant', restaurantSchema);

var app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('combined'))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    Restaurants.find({'address.zipcode': '10075'}, function (err, rests) {
        res.render('index', {
            title : 'Home',
            restaurants : rests
        })
    });
})
app.listen(3000)
