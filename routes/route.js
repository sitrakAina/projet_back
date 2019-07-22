module.exports = (app) => {
    const pers = require('../controllers/controller');
    app.post('/register', pers.register);
    app.post('/login', pers.login);
    // app.get('/cuisiner', pers.cuisiner);  
}