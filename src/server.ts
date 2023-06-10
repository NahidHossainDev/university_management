import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string)
    logger.info('mongo server connected!')
    app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`)
    })
  } catch (err) {
    logger.error(err)
  }
}
bootstrap()
