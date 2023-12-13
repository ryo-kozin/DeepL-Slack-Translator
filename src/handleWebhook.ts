import type * as express from 'express'
import { extractTextAndTimestamp } from './extractTextAndTimestamp'
import { translateText } from './translateText'
import { postToSlack } from './postToSlack'
import { type SlackEventBody } from './interfaces'
import { Logger } from './../src/lib/logger'

const logger = new Logger(process.env.APP_ENV ?? 'local')

export async function handleWebhook(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  try {
    if (req.body.challenge !== undefined && req.body.challenge !== '') {
      res.send(req.body.challenge)
    }

    const { text, ts } = extractTextAndTimestamp(req.body as SlackEventBody)

    const translatedText = await translateText(text)

    await postToSlack(translatedText, ts)
    res.send('Translation posted')
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message)
      res.status(500).send(e.message ?? 'Error in processing request')
    }
  }
}
