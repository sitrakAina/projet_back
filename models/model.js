const mongoose = require('mongoose');

const CuisinerSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    specialite: {type: String, required: true},
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Cuisiner', CuisinerSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);