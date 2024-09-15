import 'src/utils/system.utils'
import 'src/migrations/comprising-to-division'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorMiddleware } from 'src/middlewares'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import router from 'src/routers'

const app = express()

app.use(
  express.json({
    limit: '20mb',
  })
)
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
)

app.use(router)
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = parseInt(process.env.PORT, 10) || 80

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
