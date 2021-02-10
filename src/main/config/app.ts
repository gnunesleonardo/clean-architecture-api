import express from 'express'
import setupMiddleware from './middleware'
import setupRoutes from '../config/routes'

const app = express()
setupMiddleware(app)
setupRoutes(app)

export default app
