const express = require('express');
const nunjucks = require('nunjucks');
const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses
} = require('./src/pages');


const server = express();

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});


server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);
server.post('/give-classes', saveClasses);

server.listen(3333, () => console.log("⚡️  Server running on port 3333"));
