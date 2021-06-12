const router = require('express').Router();
const tagsRepo = require('../repositories/tags')


router.get('/', async function (req, res, next) {
    res.send(await tagsRepo.getAllTags())
});

router.get('/:id', async function (req, res, next) {
    res.send(await tagsRepo.getTag(req.params.id))
});

router.post('/', async function (req, res, next) {
    const tag = req.body;
    res.send(await tagsRepo.addtag(tag))
});



router.put('/', async function (req, res, next) {
    const tag = req.body;
    res.send(await tagsRepo.updateTag(tag))
});


router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    await tagsRepo.deletetag(id)
    res.send({ message: "success" })
}
)




module.exports = router;
