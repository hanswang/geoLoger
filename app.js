var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/geolog');

var locationSchema = new mongoose.Schema({
    'name': String,
    'latitude': Number,
    'longtitude': Number,
    'status': { type: String, default: 'enabled' },
    'created_at': { type: Date, default: Date.now },
    'updated_at': { type: Date, default: Date.now },
}, {strict: false});
locationSchema.index( { 'latitude' : 1, 'longtitude' : 1 }, {unique: true} );
locationSchema.pre('update', function () {
    this.update({}, { $set: { updated_at : new Date() } });
});
var pModel = mongoose.model('Place', locationSchema);

var app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('combined'))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    pModel.find({"status" : "enabled"}, function (err, locs) {
        res.render('index', {
            title : 'LogBook',
            locations : locs
        })
    });
})

var jsonParser = bodyParser.json();
app.post('/loggin', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    var place = req.body;

    var newPlace = new pModel({
        name: place.name,
        latitude: place.latitude,
        longtitude: place.longtitude,
    });

    for (var i = 0; i < place.address.length; i++) {
        var cp = place.address[i];
        newPlace.set(cp.types[0], cp.short_name);
    }

    newPlace.save(function (err, place, count) {
        if (err) {
            return res.send({status: 'failed', error: err});
        }
        return res.send({status: 'success', count: count, place: place});
    })
})

app.post('/removelog', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var q = req.body;
    pModel.findByIdAndUpdate(q.id, { 'status' : 'disabled', 'updated_at' : new Date() }, function(err, place) {
        if (err) {
            return res.send({status: 'failed', error: err});
        }
        return res.send({status: 'success', place: place});
    });
})
app.listen(3000)
