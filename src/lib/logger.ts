import winston from 'winston'

export class Logger {
  private logger!: winston.Logger
  private logLevel!: string

  constructor(private appEnv: string) {
    this.initialize()
  }

  private initialize(): void {
    this.logLevel = this.appEnv !== 'local' ? 'debug' : 'info'

    this.logger = winston.createLogger({
      level: this.logLevel,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'winston-lambda' },
      transports: [
        new winston.transports.Console({
          level: this.logLevel,
        }),
      ],
    })
  }

  public getLogger(): winston.Logger {
    return this.logger
  }

  public setLogLevel(logLevel: string): void {
    this.logLevel = logLevel
    this.logger.transports[0].level = logLevel
  }
}
