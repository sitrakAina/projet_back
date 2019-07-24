const Cuisiner = require('../models/adminModel');
const fs = require('fs');
const bcrypt = require('bcrypt');

//AJOUT DE NOUVEAU CUISINER
exports.postAdmin =  (req, res) => {
    var nom = req.body.nom
    var email = req.body.email
    var password = req.body.password
    var pwd = req.body.pwd
    var specialite = req.body.specialite

    Cuisiner.find()
        .then(note => {
            if (note.length == 0) {
                id = 0;
            } else {
                id = parseInt(note[note.length - 1].id) + 1;
            }
            const cuisiner = new Cuisiner({ _id: id, nom: nom, email: email, password: password, specialite: specialite });

            if (nom || email || password || pwd || specialite) {
                (password !== pwd) ? console.log("Erreur passwords") :

                    bcrypt.genSalt((err,salt) =>{
                        bcrypt.hash(cuisiner.password, salt, (err,hash)=>{
                            if(err) throw err;
                            cuisiner.password = hash;
                            cuisiner
                                .save()
                                .then(note => {
                                    res.json(note)
                                });
                        })
                    });
                    // cuisiner.save()
                    //     .then((note) => {
                    //         res.send(note);
                    //     })
                    //     .catch(e => {
                    //         res.status(500).send({ mes: e.mes || "erreur" })
                    //     })
            }
        })
}

//AFFICHAGE DE TOUS LES CUISINER
// exports.getAdmin = (req, res) => {
//     Cuisiner.find()
//         .then(note => {
//             console.log("tafiditra")
//             res.send(note)
//         })
//         .catch(e => {
//             res.status(500).send({ mes: e.mes || "erreur" })
//         });
// };

// //MODIFICATION INFO CUISINER
// exports.updateAdmin = (req, res) => {
//     var nom = req.body.nom
//     var email = req.body.email
//     var password = req.body.password
//     var pwd = req.body.pwd
//     if (!nom || !email || !password || !pwd) {
//         console.log("informations manquantes");
//     } else {
//         (password !== pwd) ? console.log("Erreur passwords") :
//         Cuisiner.findByIdAndUpdate(req.params.id, { nom: nom, email: email, password: password }, (err, product) => {
//             Cuisiner.find()
//                     .then(note => { res.send(note) })
//             })
//     }
// };

// //SUPPRESSION CLIENT
// exports.deleteAdmin = function (req, res) {
//     Cuisiner.findByIdAndRemove(req.params.id, function (err) {
//         Cuisiner.find()
//             .then(note => { res.send(note) })
//     })
// };

//AUTHENTIFICATION
exports.postLogin =  (req, res) => {
    var nom = req.body.nom
    var password = req.body.password
    var result;
    Cuisiner.find()
        .then(note => {
            for (let i = 0; i < note.length; i++) {
                if ((note[i].nom == nom || note[i].email == nom) && note[i].password == password) {
                     console.log('login validé', note[i]);
                     result =note[i]
                     i = note.length
                } else {
                     console.log('password erroné');
                     result ='ko'
                }
            }
            res.send(result)
        })
}
