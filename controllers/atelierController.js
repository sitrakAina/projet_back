const Atelier = require('../models/atelierModel');
const fs = require('fs')

//Create new Article
// exports.postAtelier = (req, res) => {
//     if(!req.body.titre || !req.body.prix) {
//         console.log('console.log 1 '+req.file);
        
//         console.log('console.log 2 '+req.body.titre);
        
        
//         return res.status(400).send({
//             message: "profil content can not be empty"
            
//         });
//     }

//     Atelier.find()
//         .then(item => {
//             var id;
//             if (item.length == 0) {
//                 id = 0
//             } else {
//                 id = parseInt(item[item.length - 1]._id) + 1
//             }

//             // images
//             let imageFile = req.files.photo;
//             //console.log('inona ny ato o!'+imageFile)
//             let nomImage = idautom
//             res.setHeader('Content-Type', 'text/plain');

//             imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
//               if (err) {
//                 return res.status(500).send(err);
//               }
              
              
//               //res.send({file:`public/${nomImage }.jpg`});
              
              
//             });
            
//             const atelier = new Atelier({
//                 _id: id,
//                 titre: req.body.titre,
//                 description: req.body.description,
//                 date: req.body.date,
//                 heure: req.body.heure,
//                 duree: req.body.duree,
//                 places: req.body.places,
//                 reservation: req.body.reservation,
//                 prix: req.body.prix,
//                 photo: req.body.titre + nomImage + '.jpg'
//             });
//             atelier.save()
//                 .then(() => {
//                     Profile.find()
//                         .then(data => {
//                             res.send(data);
//                         })
//                 }).catch(err => {
//                     res.status(500).send({
//                         message: err.message || "Something wrong while creating the atelier."
//                     });
//                 });
//         })
// };

//Create new profil
exports.postAtelier = (req, res) => {
    Atelier.find()
    .then(user => {
        //autoincrement
        let idautom;
        if(user.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(user[user.length - 1]._id) + 1
        }
        
        // //images
        let imageFile = req.files.photo;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = idautom
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          
          
          //res.send({file:`public/${nomImage }.jpg`});
          
          
        });
        
        
        
        //console.log('image file '+req.body.filename)
    const atelier = new Atelier({   
             
        _id: idautom,
        titre: req.body.titre , 
        description: req.body.description,
        date: req.body.date,
        heure: req.body.heure,
        duree: req.body.duree,
        places: req.body.places,
        reservation: req.body.reservation,
        prix: req.body.prix,
        photo:'' + nomImage +'.jpg'
    });

    // Save p in the database
    atelier.save()
    .then(() => {
        Profile.find()
        .then(data=>{
            res.send(data);
        })
    }).catch(err => {
        res.status(200).send({
            message: err.message || "Something wrong while creating the profil."
            
        });
    });
    })
};

//Get un par un image
exports.lireImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./controllers/public/'+req.params.photo)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("erreur be miitsy", e.stack);
    }
}


    
exports.findAllAtelier = (req, res) => {
    Atelier.find()
        .then(article => {
            res.send(article);
        }).catch(err => {
            res.status(500).send(article => {
                message: err.message || "Something wrong while retrieving Ateliers."
            });
        });
};

// Find a single article with a articleID
exports.findOne = (req, res) => {
    Atelier.findById(req.params.atelierId)
        .then(atelierchoix => {
            //console.log(unprofil)
            if (!atelierchoix) {
                return res.status(404).send({
                    message: "Atelier not found with id" + req.params.atelierId
                });
            }
            else {
                res.send(atelierchoix);
            }


        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "profil not found with id " + req.params.profilId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving profil with id " + req.params.profilId
            });
        });
};
