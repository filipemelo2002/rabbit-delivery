import server from './server'
import { logger } from './utils'
import mongoConnect from './services/mongoService'

mongoConnect()

const PORT = process.env.PORT || 3000
server.listen(PORT, () => logger.info(`Server running at ${PORT}`))
