import type { ErrorRequestHandler, RequestHandler } from 'express'

export const notFound: RequestHandler = (req, res, next) => {
  const error = new ErrorObject(
    `Invalid route - ${req.method} ${req.originalUrl}`,
    404,
  )

  next(error)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err.code || 500

  if (err instanceof ErrorObject === false) {
    console.error(JSON.stringify(err).toString())
  }
  else {
    console.error(err)
  }

  res.status(statusCode).json({
    error: {
      code: err.code,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '⛷️' : err.stack,
    },
  })
}

export class ErrorObject extends Error {
  code: number

  constructor(message: string, code: number = 400) {
    super(message)
    this.code = code
    this.name = 'ErrorObject'
    Object.setPrototypeOf(this, ErrorObject.prototype)
  }
}
