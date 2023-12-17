import 'dotenv/config'
import express from 'express'
import { Logger } from './lib/logger.js'
import { handleWebhook } from './handleWebhook.js'

const logger = new Logger(process.env.APP_ENV ?? 'local')
const app = express()

try {
  app.use(express.json())

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post('/webhook', handleWebhook)

  if (process.env.APP_ENV !== 'test') {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  }
} catch (e: any) {
  logger.error(`An error occurred: ${e.message}`)
}

export default app
