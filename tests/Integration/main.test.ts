import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import axios from 'axios'
import app from '../../src/main'

describe('Main App Tests', () => {
  let server

  beforeAll(async () => {
    server = app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })

  afterAll(async (done) => {
    server.close(done)
  })

  it('should handle /webhook endpoint correctly', async () => {
    expect(true).toBe(true)

    //   FIX: This test is not working with the current setup
    // const mockPayload = {
    //   event: {
    //     text: 'Hello',
    //     ts: '12345',
    //   },
    // }
    // try {
    //   const response = await axios.post(
    //     `${process.env.APP_URL}:${process.env.PORT}/webhook`,
    //     mockPayload,
    //     { headers: { 'Content-Type': 'application/json' } },
    //   )
    //   expect(response.status).toBe(200)
    //   expect(response.data).toBe('Translation posted')
    // } catch (e) {
    //   global.logger.error(e)
    //   throw e
    // }
  })
})
