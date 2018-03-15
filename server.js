const express = require('express');
var phantom = require('phantom');
const app = express();
const cheerio = require('cheerio');
const port = process.env.PORT || 5000;

var Horseman = require('node-horseman');
var horseman = new Horseman();

app.get('/api/hello', (req, res) => {

  const location = req.query.location;
  const keywords = req.query.keywords;

  // console.log('Searching for ' + keywords + ' in ' + location);



  // var z = horseman
  // .open('http://www.kijiji.com')
  // .title();
  // .type('input[name="login"]', username)
  // .type('input[name="password"]', password)
  // .click('input[name="commit"]')

  if(location.trim() && keywords.trim()){

    var dom;
    var results;

    var z =  horseman
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .open('http://www.kijiji.com')
        .catch(function(error){

          console.log('-------------------\n' + error);

        })
        .on('consoleMessage', function( msg ){
          console.log(msg);
        })
        // .type('input[name="keywords"]', keywords)
        // .waitForNextPage()
        // .waitForSelector()
        .html('.locationListContainer-3610177299')
        .evaluate(function(){

          $ = window.$ || window.jQuery;

          var x = $('li > a:contains("Ottawa")').eq(0);
          // console.log(x.text());


          var keywordField = $('input[name="keywords"]').attr('value', 'iphone');
          console.log($('input[name="keywords"]').attr('value'));


          var locationField = $('input[name="SearchLocationPicker"]').attr('value');
          console.log(locationField);

          //
          // return x;

        })
        .click('button[name="SearchSubmit"]')
        .waitForNextPage({timeout: 10000})
        .html()
        .then((html2) => {
          dom = html2;
          console.log(dom);
          //
          const $ = cheerio.load(dom);
          //
          // // console.log($('.appbar'));
          var a = $('.container-results').html();
          results = a;
          console.log(results);
          //
          // if(results){
          //   res.send({
          //     status: 'Searched for ' + keywords + ' in ' + location,
          //     message: results
          //   });
          //
          // }else {
          //   res.send({
          //     status: 'Try your search again!',
          //     message: 'Your search did not return any results.'
          //   });
          // }


        });

        // .close(); //this will cause the phantom process to die!!

        // console.log(z);

        //LEFT OFF HERE:-------
        /*
          Found a way to select the drop down list by searching for the city
          (text) in the dom and then setting the input form value
          for location to the value of the li or the title attribute

        */





  }else{

    res.send({
      status: 'Cannot be empty!',
      message: 'Try using keywords that are generic.'
    });




  }


});

app.listen(port, () => console.log(`Listening on port ${port}`));
