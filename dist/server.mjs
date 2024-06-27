import {
  getEventAttendees
} from "./chunk-GRCHUWNY.mjs";
import {
  getEvent
} from "./chunk-LWEUPGG4.mjs";
import {
  errorHandler
} from "./chunk-JGD4F5ML.mjs";
import {
  attendeeForEvent
} from "./chunk-TCYDGXI3.mjs";
import {
  checkIn
} from "./chunk-W65WBDG5.mjs";
import {
  createEvent
} from "./chunk-PYJ6S3DT.mjs";
import "./chunk-QVSMQEDQ.mjs";
import {
  getAttendeeBadge
} from "./chunk-OSBCGS7M.mjs";
import "./chunk-Q3WNCVPN.mjs";
import "./chunk-XNXSUPUX.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "event-manager",
      description: "Event manager's back-end API specification",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(attendeeForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 1502, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on port 1502");
  console.log("http://localhost:1502");
});
