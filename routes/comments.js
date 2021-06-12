const router = require('express').Router();
const { Router } = require('express');
const commentsRepo = require('../repositories/comments')


router.get('/', async function (req, res, next) {
    res.send(await commentsRepo.getAllComment())
});

router.get('/:id', async function (req, res, next) {
    res.send(await commentsRepo.getComment(req.params.id))
});

router.post('/', async function (req, res, next) {
    const comment = req.body;
    res.send(await commentsRepo.addComment(comment))
});



router.put('/', async function (req, res, next) {
    const comment = req.comment;
    res.send(await commentsRepo.updateComment(comment))
});


router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    await commentsRepo.deleteComment(id)
    res.send({ message: "success" })
}
)




module.exports = router;
