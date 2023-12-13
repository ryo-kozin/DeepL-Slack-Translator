import express from 'express'
import { describe, it, expect, vi } from 'vitest'
import { handleWebhook } from '../../src/handleWebhook'
import { extractTextAndTimestamp } from '../../src/extractTextAndTimestamp'
import { translateText } from '../../src/translateText'
import { postToSlack } from '../../src/postToSlack'

vi.mock('../../src/extractTextAndTimestamp', () => ({
  extractTextAndTimestamp: vi.fn(() => ({ text: 'test text', ts: '12345' })),
}))

vi.mock('../../src/translateText', () => ({
  translateText: vi.fn(() => Promise.resolve('translated text')),
}))

vi.mock('../../src/postToSlack', () => ({
  postToSlack: vi.fn(() => Promise.resolve()),
}))

describe('handleWebhook', () => {
  it('should process webhook request correctly', async () => {
    const req = {
      body: {
        event: {
          text: 'test text',
          ts: '12345',
        },
      },
    } as unknown as express.Request
    const res = {
      send: vi.fn(),
      status: vi.fn(() => res),
    } as unknown as express.Response

    await handleWebhook(req, res)

    expect(extractTextAndTimestamp).toHaveBeenCalled()
    expect(translateText).toHaveBeenCalledWith('test text')
    expect(postToSlack).toHaveBeenCalledWith('translated text', '12345')
    expect(res.send).toHaveBeenCalledWith('Translation posted')
  })

  it('responds to challenge requests', async () => {
    const req = {
      body: {
        challenge: 'challenge_token',
      },
    } as unknown as express.Request
    const res = {
      send: vi.fn(),
    } as unknown as express.Response

    await handleWebhook(req, res)

    expect(res.send).toHaveBeenCalledWith('challenge_token')
  })

  //   it('sends a 500 response on error', async () => {
  //     const errorMessage = 'Test error'

  //     vi.mocked(extractTextAndTimestamp).mockImplementationOnce(() => {
  //       throw new Error(errorMessage)
  //     })

  //     const req = { body: {} } as any
  //     const res = {
  //       send: vi.fn(),
  //       status: vi.fn(() => res),
  //     } as any

  //     await handleWebhook(req, res)

  //     expect(res.status).toHaveBeenCalledWith(500)
  //     expect(res.send).toHaveBeenCalledWith(errorMessage)
  //   })

  it('handles requests with no text', async () => {
    const req = {
      body: {
        event: {},
      },
    } as unknown as express.Request
    const res = {
      send: vi.fn(),
      status: vi.fn(() => res),
    } as unknown as express.Response

    await handleWebhook(req, res)

    expect(res.send).toHaveBeenCalledWith('Translation posted')
  })
})
