var express = require('express');
var bp = require('body-parser');
var path = require('path');
var root = __dirname;
var port = process.env.PORT || 8000;
var app = express();

app.use(express.static(path.join(root, './client')));
app.use(express.static(path.join(root, './bower_components')));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(port, function(){
    console.log('listening on port', port);
});