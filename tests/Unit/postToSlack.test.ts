import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { postToSlack } from '../../src/postToSlack'

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: 'success' })),
  },
}))

describe('postToSlack', () => {
  it('should post data to Slack', async () => {
    const data = {
      text: 'test text',
      thread_ts: '12345',
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    const payload = { payload: JSON.stringify(data) }

    await postToSlack('test text', '12345')

    expect(axios.post).toHaveBeenCalledWith(process.env.WEBHOOK_URL, payload, {
      headers,
    })
  })

  it('should post data to Slack', async () => {
    process.env.THREAD_POST_FLG = 'false'

    const data = {
      text: 'test text',
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    const payload = { payload: JSON.stringify(data) }

    await postToSlack('test text', '12345')

    expect(axios.post).toHaveBeenCalledWith(process.env.WEBHOOK_URL, payload, {
      headers,
    })

    process.env.THREAD_POST_FLG = 'true'
  })

  it('throws an error if WEBHOOK_URL is not defined', async () => {
    const originalWebhookUrl = process.env.WEBHOOK_URL
    process.env.WEBHOOK_URL = ''

    await expect(postToSlack('test text', '12345')).rejects.toThrow(
      'Webhook URL is not defined',
    )

    process.env.WEBHOOK_URL = originalWebhookUrl
  })
})
