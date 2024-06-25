import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../config/prisma";
import { z } from "zod";

export async function getAttendeeBadge(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .get('/attendees/:attendeeId/badge', {
    schema: {
      params: z.object({
        attendeeId: z.string().transform(Number),
      }),
      response: {
        200: z.object({
          attendee: z.object({
            name: z.string(),
            email: z.string(),
            eventTitle: z.string(),
          })
        })
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params

    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true,
          }
        }
      },
      where: {
        id: attendeeId,
      },
    })

    if (attendee === null) {
      throw new Error("Attendee not found.");
    }

    return reply.status(200).send({attendee: {
      name: attendee.name,
      email: attendee.email,
      eventTitle: attendee.event.title,
    }})
  })
}