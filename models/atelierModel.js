const mongoose = require('mongoose');


const ArticleSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    titre: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    heure: { type: String, required: true },
    duree: { type: String, required: true },
    places: { type: String, required: true },
    reservation: { type: String, required: true },
    prix: { type: Number, required: true },
    photo: { type: String, required: true },
}, {
        timestamps: true
    });

module.exports = mongoose.model('ateliers', ArticleSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);