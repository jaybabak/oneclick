const express = require('express');
var phantom = require('phantom');
const app = express();
const port = process.env.PORT || 5000;

var Horseman = require('node-horseman');
var horseman = new Horseman();

app.get('/api/hello', (req, res) => {


  horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .open('http://www.google.com')
    .count('a')
    .log() // prints out the number of results
    .close();

    console.log(horseman);

  res.send({ express: 'Hello From Expressasdsf' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
