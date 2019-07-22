
const Atelier = require('../schema/schemaProduit');
const fs = require('fs');

//Create new profil
exports.create = (req, res) => {
    Atelier.find()
    .then(prod => {
        //autoincrement
        let idautom;
        if(prod.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(prod[prod.length - 1]._id) + 1
        }
        
        // //images
        let imageFile = req.files.photo_profil;
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
        nom: req.body.nom , 
        prix: req.body.prix,
        detail: req.body.detail,
        photo_profil:'' + nomImage +'.jpg'
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
            message: err.message || "Something wrong while creating the produit."
            
        });
    });
})
};

exports.lireImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./controllers/public/'+req.params.photo_profil)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("erreur be miitsy", e.stack);
    }
}


exports.findAll = (req, res) => {   
    Produit.find()
    .then(prods => {    
        res.send(prods);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving produits."
        });
    });
};

// Find a single profil with a profilId
exports.findOne = (req, res) => {
    Produit.findById(req.params.produitId)
    .then(produitchoix => {
        //console.log(unprofil) 
        if(!produitchoix) {
            return res.status(404).send({
                message: "produit not found with id" + req.params.produitId
            });            
        }
        else{  
            res.send(produitchoix);             
        }
        
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "produit not found with id " + req.params.produitId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving produit with id " + req.params.produitId
        });
    });
};