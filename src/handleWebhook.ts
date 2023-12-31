import type * as express from 'express'
import { extractTextAndTimestamp } from './extractTextAndTimestamp.js'
import { translateText } from './translateText.js'
import { postToSlack } from './postToSlack.js'
import { type SlackEventBody } from './interfaces.js'
import { Logger } from './lib/logger.js'

const logger = new Logger(process.env.APP_ENV ?? 'local')

export async function handleWebhook(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  try {
    if (req.body.challenge !== undefined && req.body.challenge !== '') {
      res.send(req.body.challenge)
      return
    }

    const { text, ts } = extractTextAndTimestamp(req.body as SlackEventBody)

    const translatedText = await translateText(text)

    await postToSlack(translatedText, ts)
    res.send('Translation posted')
    return
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message)
      res.status(500).send(e.message ?? 'Error in processing request')
    }
  }
}
