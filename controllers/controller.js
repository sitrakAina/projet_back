const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// const validateRegisterInput = require('../validation/register');
// const validateLoginInput = require('../validation/login');

const Cuisiner = require('../models/model');

//register
exports.register = (req, res) => {

    // const { errors, isValid } = validateRegisterInput(req.body);

    // if(!isValid) {
    //     return res.status(400).json(errors);
    // }
    Cuisiner.find()
    .then(user => {
        //autoincrement
        let idautom;
        if(user.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(user[user.length - 1]._id) + 1
        }
        
    const cuisiner = new Cuisiner({   
             
        _id: idautom,
        nom: req.body.nom,
        prenom: req.body.prenom , 
        email: req.body.email,
        password: req.body.password,
        specialite: req.body.specialite
    });

    bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(cuisiner.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            cuisiner.password = hash;
                            cuisiner
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
    });
};

// exports.login = (req, res) => {

//     // const { errors, isValid } = validateLoginInput(req.body);

//     // if(!isValid) {
//     //     return res.status(400).json(errors);
//     // }

//     const email = req.body.email;
//     const password = req.body.password;

//     Cuisiner.find()
//         .then(user => {
//             // if(!user) {
//             //     errors.email = 'Cuisiner not found'
//             //     return res.status(404).json(errors);
//             // }
//             bcrypt.compare(password, user.password)
//                     .then(isMatch => {
//                         if(isMatch) {
//                             const payload = {
//                                 id: user.id,
//                                 nom: user.nom,
//                             }
//                             jwt.sign(payload, 'secret', {
//                                 expiresIn: 3600
//                             }, (err, token) => {
//                                 if(err) console.error('There is some error in token', err);
//                                 else {
//                                     console.log('correct Password');
//                                     res.json({
//                                         success: true,
//                                         token: `Bearer ${token}`
//                                     });
//                                 }
//                             });
//                         }
//                         else {
//                             errors.password = 'Incorrect Password';
//                             console.log('Incorrect Password');
//                             return res.status(400).json(errors);
//                         }
//                     });
//         });
// };

exports.login = (req, res) => {
    Cuisiner.findOne()
        .then(function (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result == true) {
                // res.redirect('/home');
                console.log('password correct');
            } else {
             // res.send('Incorrect password');
             // res.redirect('/');
             console.log('Incorrect password');
            }
          });
      });
    };

exports.cuisiner = ('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
};