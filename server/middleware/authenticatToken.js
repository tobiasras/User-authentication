import jwt from 'jsonwebtoken'

export function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  console.log(authHeader)

  if (!token) {
    res.status(401)
    res.send({ message: 'No token' })
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      next()
    })
  }
}
