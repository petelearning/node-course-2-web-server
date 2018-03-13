const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = '${now}: ${req.method} ${req.url}'
  console.log(now, req.method, req.url);
  fs.appendFile('server.log',log + '\n', (err) => {});
  next();
});

//app.use((req, res, next) => {
//  res.render('maintainance.hbs');
//});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() + 1
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(text)
})

app.get('/', (request, response ) => {
  //.send('<h1>Hello Express</h1>');
  response.render('index.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome',
    currentYear: '2018'
  });
});

app.get('/about', (request,response) => {
  response.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: '2018'
  });
})

app.get('/bad', (request,response) => {
  response.send({
    status:404,
    errorMessage:'page not found'});
})


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
