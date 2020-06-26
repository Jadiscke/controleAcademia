const express = require('express');
const server = express();
const nunjucks = require('nunjucks');


const port = process.env.PORT || 3000;


server.set('view engine', 'njk');
nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.use(express.urlencoded({extended:true}));
server.use(express.static('public'));

server.get('/', (req,res) => {
  // return res.render('about',{ data });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});