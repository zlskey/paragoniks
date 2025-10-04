import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import config from 'src/config'
import { errorMiddleware, timeoutMiddleware } from 'src/middlewares'
import router from 'src/routers'
import 'src/utils/system.utils'

const app = express()

app.use(
  express.json({
    limit: '10mb',
  }),
)
app.use(cookieParser())
app.use(morgan('dev'))
app.set('trust proxy', '127.0.0.1')
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: config.CORS_ORIGIN,
  }),
)

app.use(timeoutMiddleware.addTimeout)
app.use(router)
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
