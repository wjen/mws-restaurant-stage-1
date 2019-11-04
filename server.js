const express = require('express');
const path = require('path');
const app = express();
const idb = require('idb');
// app.use(favicon(__dirname + '/public/favicon.png'));
// the __dirname is the current directory from where the script is running
app.use(express.static('app'));
require('dotenv').config();

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'app/index.html'));
});
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port') + '...');
});

// let main_directory = __dirname + '/client/';
// let css_directory = main_directory + '/css/';
// let js_directory = main_directory + '/js/';
// let img_directory = main_directory + '/img/';

// app.use('/', express.static( main_directory ));
// app.use('/css', express.static( css_directory ));
// app.use('/js', express.static( js_directory ));
// app.use('/img', express.static( img_directory ));



// app.get('/', function(request, response){
//   return response.render('index.html');
// });


