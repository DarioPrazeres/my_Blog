require('dotenv').config();
var {body, validationResult} = require('express-validator');
var async = require('async');
//Models
var Article = require('../models/articleModel');
//Show All articles post
exports.index = function(req, res, next){
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
        if(err){return next(err);}
        res.render('index', {title: 'All Articles', articles: results.listArticles, articleNumber: results.article_count});
    })
    
}
//"Create" A Article
exports.getCreateArticle = function(req, res, next){
    const errors = validationResult(req);
    res.render('createArticle', {title: 'Create Article', errors: errors.array(), article: Article})
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
           res.render('createArticle', {title: 'Create Article', errors: errors.array(), article: articleNew})
        }
        else{
            Article.findOne({'title': req.body.title}).exec(function(err, found_article){
                if(err){return next(err);}
                if(found_article){
                    res.redirect(found_article.url)
                }
            });
            articleNew.save(function(err){
                if(err){return next(err);}
                res.redirect('/')
            });
        }
    }
]
//"Read" an Articles
exports.getOneArticle = function(req, res, next){
    const errors = validationResult(req)
    async.parallel({
        article: function(callback){
            Article.findById(req.params.id).exec(callback);
        },
    }, function(err, result){
        if(err){return next(err);}
        console.log(result);
        res.render('article', {title: result.article.title, article: result.article, errors: errors.array()});
    })
}
exports.getAllArticles = function(req, res, next){
    res.send('Not implemented getAllArticles yet!')
}
//Update An Articles
exports.getUpdateArticle = function(req, res, next){
    const errors = validationResult(req);
    Article.findById(req.params.id).exec(function(err, article){
        if(err){return next(err);}
        console.log(article)        
        res.render('createArticle', {title: 'Update Article', errors: errors.array(), article: article})
    })
}
exports.postUpdateArticle = function(req, res, next){
    res.send('Not Implemented Post  postUpdateArticle');
}
//"Delete" An Article
exports.getDeleteArticle = function(req, res, next){
    res.send('Not Implemented GET  getDeleteArticle')
}
exports.postDeleteArticle = function(req, res, next){
    res.send('Not Implemented POST postDeleteArticle')
}
