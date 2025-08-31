import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    await prisma.user.createMany({
        data: [
            { name: "Steve", email: "steve@test.com", passwordHash: "pass123" },
            { name: "John", email: "john@test.com", passwordHash: "pass123" },
        ],
    });
}
seed().then(() => prisma.$disconnect()); // Prevent any leaks from happening

// npx prisma db seed -- to run the function
