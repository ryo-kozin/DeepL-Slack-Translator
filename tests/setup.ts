import { Logger } from './../src/lib/logger'

global.logger = new Logger(process.env.APP_ENV ?? 'local')
