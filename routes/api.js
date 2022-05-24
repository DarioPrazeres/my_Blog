var express = require('express');
//var jwt = require('jsonwebtoken')
var router = express.Router();

var articlesController = require('../controllers/articlesControllerApi');
//Articles Controllers
router.get('/api', (req, res, next) =>{
    res.json({message:'Hello World'})
});
//*******Articles Controllers
//Show All Article
router.get('/api/posts', articlesController.index);
//Show only one Article
router.get('/api/posts/:id', articlesController.getOneArticle);
//Create an Article
router.post('/api/post/create',articlesController.postCreateArticle);
//Update an Article
router.patch('/api/posts/:id/update', articlesController.updateArticle);
//Delete an Article
router.delete('api/posts/:id/delete',  articlesController.deleteArticle);
module.exports = router;