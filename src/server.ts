import fastify from 'fastify'
import z from 'zod'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient({
  log: ['query'],

})

app.post('/events', async (request ,reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().max(500),
    slug: z.string(),
    maximumAttendees: z.number().int().positive().nullable(),
  })

  const data = createEventSchema.parse(request.body)

  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      slug: data.details,
      maximumAttendees: data.maximumAttendees,
    }
  })

  return reply.status(201).send({eventId: event.id})
})

app.listen({ port:1502 }).then(() => {
  console.log('Server is running on port 1502')
  console.log('http://localhost:1502')
})