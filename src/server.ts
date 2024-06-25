import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-event'
import { attendeeForEvent } from './routes/attendee-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'


const app = fastify()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(attendeeForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)

app.listen({ port:1502, host: '0.0.0.0' }).then(() => {
  console.log('Server is running on port 1502')
  console.log('http://localhost:1502')
})