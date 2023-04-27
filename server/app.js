import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userAuthenticationRoutes from './routes/userAuthenticationRoutes.js'
import quotesRoutes from './routes/quotesRoutes.js'
import { authenticateToken } from './middleware/authenticatToken.js'

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()
// MIDDLEWARE

app.use(userAuthenticationRoutes)
app.use(authenticateToken)
app.use(quotesRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('running on: ', PORT))
