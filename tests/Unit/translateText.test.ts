import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { translateText } from '../../src/translateText'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({ data: { translations: [{ text: 'Hello' }] } }),
    ),
  },
}))

describe('translateText', () => {
  it('translates text using DeepL API', async () => {
    const result = await translateText('こんにちは')
    expect(result).toBe('Hello')
    expect(axios.get).toHaveBeenCalled()
  })

  it('throws an error for no text provided', async () => {
    await expect(translateText('')).rejects.toThrow('No text provided')
  })

  it('throws an error for no language detected', async () => {
    await expect(translateText('😆')).rejects.toThrow('No language detected')
  })

  it('throws an error for unsupported language', async () => {
    await expect(translateText('좋은 아침')).rejects.toThrow(
      'Unsupported language',
    )
  })
})
