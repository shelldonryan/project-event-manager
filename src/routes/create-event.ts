import { FastifyInstance } from "fastify/types/instance";
import { z } from "zod";
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { generateSlug } from '../utils/generate-slug';
import { prisma } from '../config/prisma'

export async function createEvent(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/events', {
    schema: {
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
      }),
      response: {
        201: z.object({
          eventId: z.string(),
        })
      }
    }
  }, async (request ,reply) => {
    const { title, details, maximumAttendees } = request.body
    
    const slug = generateSlug(title)
  
    const withSameSlug = await prisma.event.findUnique({
      where: {
        slug,
      }
    })
  
    if (withSameSlug !== null) {
      throw new Error("An event with the same title already exists")
    }
  
    const event = await prisma.event.create({
      data: {
        title,
        details,
        slug,
        maximumAttendees,
      }
    })
  
    return reply.status(201).send({eventId: event.id})
  })
}