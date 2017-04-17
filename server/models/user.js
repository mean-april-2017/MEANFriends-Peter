console.log("/server/models/user.js");

var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    first_name: String, 
    last_name: String,
    birthday: Date
}, {timestamps: true});
mongoose.model('User', userSchema);