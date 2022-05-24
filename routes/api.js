var express = require('express');
//var jwt = require('jsonwebtoken')
var router = express.Router();

var articlesController = require('../controllers/articlesControllerApi');
//Articles Controllers
router.get('/api', (req, res, next) =>{
    res.json({message:'Hello World'})
});
//Articles Controllers
router.get('/api/posts', articlesController.index);
router.get('/api/posts/:id', articlesController.getOneArticle);
router.post('/api/post/create',articlesController.postCreateArticle);
//Read One
/*
router.get('/posts/:id', articlesController.getOneArticle);
//Create an Articles
router.get('/post/create', articlesController.getCreateArticle);

//update An Article
router.get('/posts/:id/update', articlesController.getUpdateArticle);
router.post('/posts/:id/update', articlesController.postUpdateArticle);
//Delete an Article
router.get('/posts/:id/delete', articlesController.getDeleteArticle);
router.post('/posts/:id/delete', articlesController.postDeleteArticle);
*/
module.exports = router;