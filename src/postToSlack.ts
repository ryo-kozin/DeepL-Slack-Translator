import axios from 'axios'
import { Logger } from './lib/logger.js'
const logger = new Logger(process.env.APP_ENV ?? 'local')

export async function postToSlack(text: string, ts: string): Promise<void> {
  const { THREAD_POST_FLG, WEBHOOK_URL } = process.env

  if (WEBHOOK_URL === undefined || WEBHOOK_URL === '') {
    throw new Error('Webhook URL is not defined')
  }

  try {
    const data = {
      text,
      ...(THREAD_POST_FLG === 'true' && ts !== '' ? { thread_ts: ts } : {}),
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    const payload = { payload: JSON.stringify(data) }

    await axios.post(WEBHOOK_URL, payload, { headers })
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message)
      throw e
    }
  }
}
