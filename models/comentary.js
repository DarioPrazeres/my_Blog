var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ComentarySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
        }
    }
);
module.exports = mongoose.model('Comentary', ComentarySchema)