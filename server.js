'use strict';

const PORT = process.env.PORT || 3000;

let jade = require('jade');
let http = require('http');
let qs = require('qs');

let nodeStatic = require('node-static');
let file = new nodeStatic.Server('./public')

http.createServer((req, res) => {

let html;
let qsParts = req.url.split('?');
let path  = qsParts[0];
var query = qs.parse(qsParts[1]);

// if(query.theme && validateTheme(query.theme)) {
//   var theme = query.theme;
// }


 // var theme = query.theme;

  // switch(req.url) {
  switch(path) {
    case '/':
      {
        html = jade.renderFile('./views/index.jade', {
          title: 'Jade App'

          ,theme: validateTheme(query.theme)
          // ,theme: query.theme
          // ,theme: theme

        });
        res.end(html);
        break;
      }
  case '/contact':
      {
        html = jade.renderFile('./views/contact.jade', {
          title: 'Contact App'
        });
        res.end(html);
      }
  }

  file.serve(req, res);

})
.listen(PORT, err => {
  if(err) return console.log(err);
  console.log(`Node server listening on port ${PORT}`);
});


function validateTheme(theme) {

  if(theme) {
    // theme = theme ? theme.toLowerCase() : '' ;
    theme = theme.toLowerCase();
  }
    // console.log('validateTheme: ', theme);
  let themes =  [
    'cerulean','cosmo','cyborg','flatly','darkly','cosmo','cyborg','darkly','flatly','journal','lumen','paper','readable','sandstone','simplex','slate','spacelab','superhero','united','yeti'];

  if(themes.indexOf(theme) !== -1) {
    return theme;
  } else {
    return null;
  }

}