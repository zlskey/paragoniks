import { Router } from 'express'

const uploadsRouter = Router()
const currentWorkingDirectory = process.cwd()

uploadsRouter.get('/:path', (req, res) => res.sendFile(`${currentWorkingDirectory}/uploads/${req.params.path}`))

export default uploadsRouter
