export interface SlackEventBody {
  event?: {
    text?: string
    ts?: string
  }
  challenge?: string
}
