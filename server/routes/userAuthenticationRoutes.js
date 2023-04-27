import { Router } from 'express'
import jwt from 'jsonwebtoken'
import db from '../database/connection.js'
import bcrypt from 'bcrypt'
import { authenticateToken } from '../middleware/authenticatToken.js'
import transporter from '../mailer/mail.js'
import nodemailer from 'nodemailer'
const route = Router()

route.get('/authorize', authenticateToken, (req, res) => {
  res.sendStatus(204)
})

route.get('/mail/username/:email', async (req, res) => {
  try {
    const data = await db.get('SELECT username FROM users WHERE email LIKE ?', ['%' + req.params.email + '%'])

    console.log(data)

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'tobi4972@stud.kea.dk', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'THE USERNAME: ', // plain text body
      html: `<h1>${data.username}</h1>` // html body
    })

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    res.sendStatus(200)
  } catch {
    res.sendStatus(400)
  }
})

route.post('/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  console.log(password, username)

  if (!(username && password)) {
    res.status(400)
    res.send({ message: 'Bad Request' })
    return
  }

  const user = await db.get('SELECT * FROM users where username = ?', [username])
  let isCorrectPassword = false

  if (user) {
    isCorrectPassword = await bcrypt.compare(password, user.password)
  }

  if (!isCorrectPassword) {
    res.status(401)
    res.send({ message: 'The email or password is incorrect.' })
  } else {
    const jwtUser = {
      username: user.username
    }

    const accessToken = generateAccessToken(jwtUser)
    const refreshToken = jwt.sign(jwtUser, process.env.REFRESH_TOKEN_SECRET)

    res.send({ accessToken, refreshToken })
  }
})

function generateAccessToken (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
}

export default route
