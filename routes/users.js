const router = require('express').Router();
const { Router } = require('express');
const usersRepo = require('../repositories/users')


/* GET users listing. */
router.get('/', async function (req, res, next) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 1;
  res.send(await usersRepo.getUsers(offset, limit))
});

router.get('/:id', async function (req, res, next) {
  res.send(await usersRepo.getUser(req.params.id))
});

router.post('/', async function (req, res, next) {
  const user = req.body;
  const retreivedUser = await usersRepo.getUserByEmail(user.email)
  if (!retreivedUser) {
    res.send(await usersRepo.addUser(user))
  }
  else res.status(400).json({ message: 'Email already exist' })
});



router.put('/', async function (req, res, next) {
  const user = req.body;
  res.send(await usersRepo.updateUser(user))
});


router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  await usersRepo.deleteUser(id)
  res.send({ message: "success" })
}
)




module.exports = router;
