import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string);
    logger.info('mongo server connected!');
    server = app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`);
    });
  } catch (err) {
    logger.error(err);
  }

  process.on('unhandledRejection', async error => {
    errorLogger.error('Server shutting down for unhandle rejection...!');
    if (server) {
      try {
        server.close(err => {
          if (err) {
            errorLogger.error(err);
          } else {
            errorLogger.error(error);
            process.exit(1);
          }
        });
      } catch (err) {
        errorLogger.error(err);
      }
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is closed');
  if (server) {
    server.close();
  }
  process.exit(1);
});
