const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, 'dist')));


// app.get('/api/posts', (req, res) => {
//   res.send([{ id: 1}]);
// })

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
// app.set('port', (process.env.PORT || 8000));
app.listen(port);
console.log('Listening on port ' + port + '...');

// let main_directory = __dirname + '/client/';
// let js_directory = main_directory + '/js/';
// let img_directory = main_directory + '/img/';

// app.use('/', express.static( main_directory ));
// app.use('/css', express.static( css_directory ));
// app.use('/js', express.static( js_directory ));
// app.use('/img', express.static( img_directory ));


// app.get('/', function(request, response){
//   return response.render('index.html');
// });
