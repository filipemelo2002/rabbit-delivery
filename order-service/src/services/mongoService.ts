import mongoose from 'mongoose'
import { logger } from '../utils'

const MONGO_CONTAINER_NAME = process.env.MONGO_HOST || 'localhost'
const MONGO_URI = `mongodb://${MONGO_CONTAINER_NAME}:27017/rabbitDelivery`

const mongoConnect = () => {
  mongoose.connect(MONGO_URI, (error) => {
    if (!error) return
    logger.error('Fatal error ', error)
    logger.error(error?.stack)
  })
  mongoose.connection.on('connected', () => logger.info('Connected to Mongo'))
  mongoose.connection.on('error', () => logger.error('Error connecting to Mongo'))
  mongoose.connection.on('disconnected', () => logger.info('Disconected from Mongo'))
}

export default mongoConnect
