import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string)
    console.log('mongo server connected!')
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}
bootstrap()
