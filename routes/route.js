// var controllerAdmin = require('../Cotrollers/controller_admin');
// var controllerArticle = require('../Cotrollers/controller_article');

// module.exports.route = function (app) {

//     app.route('/admin').get(controllerAdmin.getAdmin)
//     app.route('/register').post(controllerAdmin.postAdmin)
//     app.route('/register/:id').put(controllerAdmin.updateAdmin)
//     app.route('/register/:id').delete(controllerAdmin.deleteAdmin)
//     app.route('/login').post(controllerAdmin.postLogin)

//     app.route('/profil').post(controllerArticle.create);
//     app.route('/profil').get(controllerArticle.findAllArticle);
//     app.route('/profil/:image').get(controllerArticle.findOneArticle);
//     // app.get('/profil/:profilId', pers.findOne);
//     // app.get('/user/:photo_profil', pers.lireImage);
// }

module.exports = (app) => {

    const controllerAdmin = require('../controllers/adminController');
    var controllerArticle = require('../controllers/atelierController');
    // app.get('/admin', controllerAdmin.getAdmin);
    app.post('/register', controllerAdmin.postAdmin);
    app.post('/login', controllerAdmin.postLogin);
    // app.put('/register/:id', controllerAdmin.updateAdmin);
    // app.delete('/register/:id', controllerAdmin.deleteAdmin); 

    app.post('/atelier', controllerArticle.postAtelier);
    app.get('/atelier', controllerArticle.findAllAtelier);
    app.get('/sary/:photo', controllerArticle.lireImage); 
}

 /*     app.route('/update/:id')
            .put(notes.updateDonnee)
        app.route('/delete/:id')
            .delete(notes.deleteDonnee)
    
        app.route('/image/:im')
            .get(notes.image)
    
    
        app.route('/article')
            .post(notes.postArticle)
        .get(notes.getArt)
    
        app.route('/comment')
            .put(notes.commentaire)
    
        app.route('/login')
            .post(notes.postLogin)
            
        app.route('/')
            .get(notes.getDonne)
            .post(notes.postDonne)
      app.route('/')
      .get(notes.getDonne) */
