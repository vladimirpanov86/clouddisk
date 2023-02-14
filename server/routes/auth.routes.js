const Router = require('express')
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const router = new Router()
const config = require('config')

router.post('/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer then 3 and shorter thsn 12').isLength({ min: 3, max: 12 })
  ],
  async (request, response) => {
    try {

      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json({ message: 'Uncorrect request', errors })
      }

      const { email, password } = request.body;

      const candidate = await User.findOne({ where: { email: email } })
      if (candidate) {
        return response.status(400).json({ message: `User with email ${email} exist` })
      }

      const hashPassword = await bcrypt.hash(password, 8)
      await User.create({ email, password: hashPassword, diskspace: 1024 ** 3 * 10, usedspace: 0, avatar: null });
      return response.json({ message: `User was created` })

    } catch (error) {
      console.log(`Registration ${error}`)
      response.send({ message: "Server error" })
    }
  }
)

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return response.status(400).json({ message: 'invalid password' })
    }
    const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
    return response.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskspace: user.diskspace,
        usedspace: user.usedspace,
        avatar: user.avatar
      }
    })
  } catch (error) {
    console.log(`Login ${error}`)
    response.send({ message: "Server error" })
  }
})

module.exports = router;