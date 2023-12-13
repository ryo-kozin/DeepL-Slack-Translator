import axios from 'axios'

export async function postToSlack(text: string, ts: string): Promise<void> {
  const { THREAD_POST_FLG, WEBHOOK_URL } = process.env

  if (WEBHOOK_URL === undefined || WEBHOOK_URL === '') {
    throw new Error('Webhook URL is not defined')
  }

  const data = {
    text,
    ...(THREAD_POST_FLG === 'true' && ts !== '' ? { thread_ts: ts } : {}),
  }

  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(data),
  }

  await axios.post(WEBHOOK_URL, options)
}
