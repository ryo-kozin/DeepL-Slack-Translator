import { describe, it, expect } from 'vitest'
import { extractTextAndTimestamp } from '../../src/extractTextAndTimestamp'
import { SlackEventBody } from '../../src/interfaces'

describe('extractTextAndTimestamp', () => {
  it('should extract text and timestamp correctly', () => {
    const body: SlackEventBody = {
      event: {
        text: 'example text',
        ts: '12345',
      },
    }

    const result = extractTextAndTimestamp(body)
    expect(result).toEqual({ text: 'example text', ts: '12345' })
  })

  it('should provide default text if no text is provided', () => {
    const body: SlackEventBody = {
      event: {
        ts: '12345',
      },
    }

    const result = extractTextAndTimestamp(body)
    expect(result).toEqual({ text: 'Default text to translate', ts: '12345' })
  })
})
