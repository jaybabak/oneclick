const express = require('express');
var phantom = require('phantom');
const app = express();
const port = process.env.PORT || 5000;

var Horseman = require('node-horseman');
var horseman = new Horseman();

app.get('/api/hello', (req, res) => {

  const location = req.query.location;
  const keywords = req.query.keywords;

  console.log('Searching for ' + keywords + ' in ' + location);


  // var z = horseman
  // .open('http://www.kijiji.com')
  // .title();
  // .type('input[name="login"]', username)
  // .type('input[name="password"]', password)
  // .click('input[name="commit"]')

var z =  horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .open('http://www.google.com')
    .type('input[name="q"]', keywords)
    .click('input[name="btnK"]')
    .waitForNextPage()
    .waitForSelector('.appbar')
    // .evaluate(function(){
    //
    //
    //
    // })
    .text('.appbar')
    .then((text) => {

      console.log(text);
    })
    .log() // prints out the number of results
    .close();

    // console.log(z);


  res.send({
    status: 'Searching for ' + keywords + ' in ' + location,
    html: z
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
