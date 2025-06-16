import express from 'express'
import { PORT } from './config/serverConfig.js'

const app = express()

app.listen(PORT, () => {
  console.log('The server is live!')
})
