require('dotenv').config();
var {body, validationResult} = require('express-validator');
var async = require('async');
var Article = require('../models/articleModel');
//Show All articles post
exports.index = function(req, res, next){
    try{
        async.parallel({
            article_count: function(callback){
                Article.countDocuments({}, callback);
            },
            listArticles: function(callback){
                Article.find({}, 'title content author datePost')
                .sort({title:1})
                .exec(callback);
            }
        },
        function(err, results){
            res.json({articles: results})
        });   
    }catch (err){
        res.status(500).json({message: err.message});
    }
}
exports.getOneArticle = (req, res, next) => {
    try {
        async.parallel({
            article: function(callback){
                Article.findById(req.params.id).exec(callback);
            },
        }, function(err, result){
            if(result.article == null){
                return res.status(404).json({message: ' Article Not Found'});
            }
            res.json({article: result.article})
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
exports.postCreateArticle = [
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('content', 'Content must not be empty.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        //Create a component
        var articleNew = new Article(
            {
                title: req.body.title,
                author: process.env.Author,
                content: req.body.content
            }
        );
        if(!errors.isEmpty()){
            res.json({eror: errors.array()});
        }
        else{
            Article.findOne({'title': req.body.title}).exec(function(err, found_article){
                if(found_article){
                    res.json({article: found_article.url})
                }
            });
            articleNew.save(function(err){
                res.status(201).json({aticle: articleNew})
            });
        }
    }
];
//Update an Article
exports.updateArticle = (req, res, next) =>{
    try {   
        const errors = validationResult(req);
        var articleUpdate = new Article(
            {
                title: req.body.title,
                author: process.env.Author,
                content: req.body.content,
                _id: req.params.id
            }
        );
        if(!errors.isEmpty()){
            res.json({error: errors.array()});
            return;
        }
        else{
            Article.findByIdAndUpdate(req.params.id, articleUpdate, {}, function(err, theArticle){
                res.json({article: theArticle});
            })
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

//Delete an Article
exports.deleteArticle = (req, res, next) => {

}