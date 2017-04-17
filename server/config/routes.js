console.log("/server/config/routes.js");

var users=require('../controllers/users');

module.exports = function(app)
{
    app.get('/api/users', users.index);
    app.get('/api/users/:id', users.show);
    app.post('/api/users', users.create);
    app.put('/api/users/:id', users.update);
    app.delete('/api/users/:id', users.delete);
    app.login('/login', users.login);
}