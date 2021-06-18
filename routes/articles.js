const router = require('express').Router();
const { Router } = require('express');
const articlesRepo = require('../repositories/articles.js')

router.get('/', async function (req, res, next) {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 1;
    res.send(await articlesRepo.getArticles(offset, limit))
});

router.get('/:id', async function (req, res, next) {
    res.send(await articlesRepo.getArticle(req.params.id))
});

router.post('/', async function (req, res, next) {
    const article = req.body;
    await articlesRepo.addArticle(article)
});



router.put('/', async function (req, res, next) {
    const article = req.body;
    res.send(await articlesRepo.updateArticle(article))
});


router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    await articlesRepo.deleteArticle(id)
    res.send({ message: "success" })
});

router.get('/:id/comments', async function (req, res, nex) {
    const id = req.params.id
    console.log(id)
    res.send(await articlesRepo.getArticlewithComments(id))
}
)





module.exports = router;
