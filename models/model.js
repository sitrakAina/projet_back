const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    specialite: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);