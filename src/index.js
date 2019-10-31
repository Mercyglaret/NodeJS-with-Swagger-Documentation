// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  })
  // Import Swagger Options
const swagger = require('../config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

//routes
const routes = require('../routes/index.js')

  // Require external modules
const mongoose = require('mongoose')

  
  // Declare a route
  fastify.get('/', async (request, reply) => {
    return { head : "mercy" }
  })
  
// Connect to DB
  mongoose.connect('mongodb://ds141188.mlab.com:41188/ecrm')
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))

  // Run the server!
  const start = async () => {
    try { 
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()

  routes.forEach((route) => {
    fastify.route(route)
   })