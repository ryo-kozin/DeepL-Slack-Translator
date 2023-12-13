import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

export class Logger {
  private logger: winston.Logger

  constructor(private appEnv: string) {
    const filename =
      appEnv === 'test' ? 'test-%DATE%.log' : 'application-%DATE%.log'
    this.logger = winston.createLogger({
      level: appEnv !== 'local' ? 'debug' : 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          dirname: 'logs',
          filename,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    })
  }

  info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta)
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta)
  }

  error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta)
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta)
  }

  verbose(message: string, ...meta: any[]) {
    this.logger.verbose(message, ...meta)
  }

  silly(message: string, ...meta: any[]) {
    this.logger.silly(message, ...meta)
  }
}
