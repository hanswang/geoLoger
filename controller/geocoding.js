var querystring = require('querystring');
var http = require('https');

var data = querystring.stringify({
    'latitude': -33.76300325837421,
    'longitude': 151.05027275236205
});

var options = {
    host: 'www.google.com.au',
    port: 443,
    path: '/search',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
    }
};

var req = http.request(options, function(res) {
    console.log(res.statusCode);
    console.log(res.headers);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('body: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(data);
req.end();
