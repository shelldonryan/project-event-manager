import {
  generateSlug
} from "./chunk-QVSMQEDQ.mjs";
import {
  BadRequest
} from "./chunk-Q3WNCVPN.mjs";
import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { title, details, maximumAttendees } = request.body;
    const slug = generateSlug(title);
    const withSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (withSameSlug !== null) {
      throw new BadRequest("An event with the same title already exists");
    }
    const event = await prisma.event.create({
      data: {
        title,
        details,
        slug,
        maximumAttendees
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
}

export {
  createEvent
};
