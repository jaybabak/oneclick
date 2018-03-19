const express = require('express');
var phantom = require('phantom');
const app = express();
const cheerio = require('cheerio');
const port = process.env.PORT || 5000;
const {OperationHelper} = require('apac');
var Horseman = require('node-horseman');

const Nightmare = require('nightmare');


const opHelper = new OperationHelper({
    awsId:     'AKIAIWWTBHNGYYVT5EIQ',
    awsSecret: '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',
    assocId:   'oneclick00c-20',
    locale: 'CA'
});



app.get('/api/hello', (req, res) => {

  const location = req.query.location;
  const keywords = req.query.keywords;


  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': keywords,
    'ResponseGroup': 'ItemAttributes,Offers',
    'ItemPage': '1'
  }).then((response) => {
      // console.log("Results object: ", response.result);
      // console.log("Raw response body: ", response.responseBody);




  }).catch((err) => {
      console.error("Something went wrong! ", err);
  });


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
    var userLocation;

    var nightmare = Nightmare();

    const bod = 'body';

    var ghost = nightmare
        .goto('http://www.kijiji.com')
        .insert('input[name="keywords"]', keywords)
        .click('button[name="SearchSubmit"]')
        .wait('body')
        .evaluate(function () {

          if(document.querySelectorAll('.showing').length > 0){
            return document.querySelector('.showing').innerText;
          }else{
            return null;
          }

          // return document.querySelector('.showing').innerText
        })
        .end()
        .then(function (result) {
          // console.log(result)

          if(result){
            res.send({
              status: 'Searched for ' + keywords + ' in ' + 'your location!',
              message: result + ' results retrieved from Kijiji!'
            });

          }else if(result == null) {
            res.send({
              status: 'Try your search again!',
              message: 'Your search did not return any results.'
            });
          }




        })
        .catch(function (error) {
          console.error('Search failed:', error);
        });


        //
        // .goto('http://www.kijiji.com')
        // .then(function(page){
        //
        //   if (Number(page.code) >= 400) {
        //     throw 'Page failed with status: ' + page.code;
        //   }else if (Number(page.code) == 200 || Number(page.code) == 301){
        //     console.log('Sucess! Staus Code: ' + page.code);
        //     // return page;
        //   }
        //
        //
        // })
        // .wait('50000')
        // .type('input[name="keywords"]', keywords)
        // .click('button[name="SearchSubmit"]')
        // .wait('.showing')
        // .evaluate(() => {
        //   var bod = document.querySelector('body');
        //   console.log(bod);
        //   return bod;
        // })
        // .then((value) => console.log(value));
        // .catch(error => {
        //   console.warn('Search failed:', error);
        // })


    // var horseman = new Horseman();
    // var z =  horseman
    //     .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    //     .open('http://www.kijiji.com')
    //     .status()
    //     .then(function(statusCode){
    //
    //       // console.log('HTTP status code: ', statusCode);
    //
    //       if (Number(statusCode) >= 400) {
    //         throw 'Page failed with status: ' + statusCode;
    //       }else if (Number(statusCode) == 200 || Number(statusCode) == 301){
    //         console.log('Sucess! Staus Code: 200/301');
    //       }
    //
    //     })
    //     .catch(function(error){
    //
    //       console.log('-------------------\n' + error);
    //
    //     })
    //     .on('consoleMessage', function( msg ){
    //       console.log(msg);
    //     })
    //     // .type('input[name="keywords"]', keywords)
    //     // .waitForNextPage()
    //     // .waitForSelector()
    //     .html('.locationListContainer-3610177299')
    //     .evaluate(function(keyws, userLocation){
    //
    //       $ = window.$ || window.jQuery;
    //
    //       var x = $('li > a:contains("Ottawa")').eq(0);
    //       // console.log(x.text());
    //
    //       // var keywordField = $('input[name="keywords"]').attr('value', 'iphone');
    //       var keywordField = $('input[name="keywords"]').val(keyws);
    //       console.log($('input[name="keywords"]').val());
    //
    //
    //       // var locationField = $('input[name="SearchLocationPicker"]').val();
    //       var locationField = $('input[name="SearchLocationPicker"]').attr('value');
    //       console.log(locationField);
    //       userLocation = locationField;
    //       // console.log(locationField);
    //
    //       //
    //       // return x;
    //
    //     }, keywords, userLocation)
    //     .click('button[name="SearchSubmit"]')
    //     .waitForNextPage({timeout: 10000})
    //     .html()
    //     .then((html2) => {
    //       dom = html2;
    //       // console.log(dom);
    //       //
    //       const $ = cheerio.load(dom);
    //       //
    //       // // console.log($('.appbar'));
    //       var a = $('.showing').text();
    //       results = a;
    //       // console.log(results);
    //       // console.log(userLocation);
    //       //neet to set userLocation for status message below!
    //       if(results){
    //         res.send({
    //           status: 'Searched for ' + keywords + ' in ' + 'your location!',
    //           message: results + ' results retrieved from Kijiji!'
    //         });
    //
    //       }else {
    //         res.send({
    //           status: 'Try your search again!',
    //           message: 'Your search did not return any results.'
    //         });
    //       }
    //
    //
    //     });

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
