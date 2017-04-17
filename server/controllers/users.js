console.log("/server/controllers/users.js");

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.index = function(request, response){
    User.find({}, function(err, users){
        if(err){
            console.log(err);
        }
        else{
            response.json({message: "Users Index", users: users});
        }
    });
}

module.exports.show = function(request, response){
    User.findOne({ _id: request.params.id }, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            response.json({message: "User" + user._id, user: user});
        }
    });
}

module.exports.update = function(request,response){
    User.findOne({ _id: request.params.id }, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            user.first_name = request.body.first_name;
            user.last_name = request.body.last_name;
            user.birthday = request.body.birthday;
            user.save(function(err, updatedUser){
                if (err){
                    console.log(err);
                }
                else{
                    response.json(updatedUser);
                }
            })
        }
    })
}

module.exports.create = function(request, response){
    var user = new User({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        birthday: request.body.birthday
    });
    user.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            response.json({message: "successfully created user", user: user});
        }
    });
}

module.exports.delete = function(request, response){
    User.remove({ _id: request.params.id}, function(err){
        if(err){
            console.log(err);
        }
        else{
            response.json({message: "BELEETED"});
        }
    })
}