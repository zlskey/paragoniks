import cookieParser from 'cookie-parser'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorMiddleware } from 'src/middlewares'
import router from 'src/routers'
import 'src/utils/system.utils'

const app = express()

app.use(
  express.json({
    limit: '20mb',
  }),
)
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: process.env.CORS_ORIGIN,
  }),
)

app.use(router)
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = Number.parseInt(process.env.PORT, 10) || 80

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
