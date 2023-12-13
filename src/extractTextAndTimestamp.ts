import { type SlackEventBody } from './interfaces'

export function extractTextAndTimestamp(body: SlackEventBody): {
  text: string
  ts: string
} {
  return {
    text: body.event?.text ?? 'Default text to translate',
    ts: body.event?.ts ?? '',
  }
}
