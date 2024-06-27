import {
  BadRequest
} from "./chunk-Q3WNCVPN.mjs";
import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/get-attendee-badge.ts
import { z } from "zod";
async function getAttendeeBadge(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/badge", {
    schema: {
      summary: "Get the attendee's badge",
      tags: ["attendee"],
      params: z.object({
        attendeeId: z.string().transform(Number)
      }),
      response: {
        200: z.object({
          badge: z.object({
            name: z.string(),
            email: z.string(),
            eventTitle: z.string(),
            checkInUrl: z.string().url()
          })
        })
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id: attendeeId
      }
    });
    if (attendee === null) {
      throw new BadRequest("Attendee not found.");
    }
    const baseUrl = `${request.protocol}://${request.hostname}`;
    const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl);
    return reply.status(200).send({ badge: {
      name: attendee.name,
      email: attendee.email,
      eventTitle: attendee.event.title,
      checkInUrl: checkInUrl.toString()
    } });
  });
}

export {
  getAttendeeBadge
};
