const router = require('express').Router();
const { Router } = require('express');
const usersRepo = require('../repositories/users')


/* GET users listing. */
router.get('/', async function (req, res, next) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
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
  const retreivedUser = await usersRepo.getUser(user.id)

  console.log(retreivedUser)
  if (retreivedUser.length != 0) {
    res.send(await usersRepo.updateUser(user))
  }
  else {
    res.status(400).json({ message: 'no user with id ' + user.id })
  }

});


router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  await usersRepo.deleteUser(id)
  res.send({ id })
}
)




module.exports = router;
