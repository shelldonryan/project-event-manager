import { prisma } from "../src/config/prisma"

async function seed() {
  await prisma.event.create({
    data: {
      id: "5658c464-7d8f-4b4c-aa73-26bcd87bbae9",
      title: "Seed Event",
      details: "Seed Event Description",
      slug: "seed-event",
      maximumAttendees: 100,
    }
  }) 
}

seed()
.then(() => {
  console.log("Database Seeded!")
  prisma.$disconnect()
})