var express = require('express');
var router = express.Router();

var articlesController = require('../controllers/articlesController')
//Articles Controllers
router.get('/posts', articlesController.index);
//Read One
router.get('/posts/:id', articlesController.getOneArticle);
//Create an Articles
router.get('/post/create', articlesController.getCreateArticle);
router.post('/post/create', articlesController.postCreateArticle);
//update An Article
router.get('/posts/:id/update', articlesController.getUpdateArticle);
router.post('/posts/:id/update', articlesController.postUpdateArticle);
//Delete an Article
router.get('/posts/:id/delete', articlesController.getDeleteArticle);
router.post('/posts/:id/delete', articlesController.postDeleteArticle);

module.exports = router;