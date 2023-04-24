import express from 'express'
import userAuthenticationRoutes from './routes/userAuthenticationRoutes.js'
import quotesRoutes from './routes/quotesRoutes.js'
const app = express()

const PORT = process.env.PORT || 8080

app.use(userAuthenticationRoutes)
app.use(quotesRoutes)

app.listen(PORT, () => console.log('running on: ', PORT))
