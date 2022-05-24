var mongoose = require('mongoose');
var  Schema = mongoose.Schema;

var ArticleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        isPosted:{
            type: Boolean,
            default: false
        },   
        datePost: {
            type: Date, 
            default: Date.now
        }        
    }
);
ArticleSchema.virtual('url').get(function(){
    return '/posts/' + this._id;
})
module.exports = mongoose.model('Article', ArticleSchema);
