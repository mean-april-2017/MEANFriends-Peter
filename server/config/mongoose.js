console.log("/server/config/mongoose.js");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/file_structure', function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to mongoose');
    }
})
require('../models/user');