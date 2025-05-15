require("dotenv").config();
const { Client } = require("pg");
const { createClient } = require("redis");

async function checkPostgres() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    try {
        await client.connect();
        console.log("✅ PostgreSQL connected");
    } catch (err) {
        console.error("❌ PostgreSQL connection failed:", err.message);
    } finally {
        await client.end();
    }
}

// async function checkRedis() {
//     const redis = createClient({ url: process.env.REDIS_URL });
//     redis.on("error", (err) => console.error("❌ Redis error:", err));
//     try {
//         await redis.connect();
//         console.log("✅ Redis connected");
//     } catch (err) {
//         console.error("❌ Redis connection failed:", err.message);
//     } finally {
//         await redis.quit();
//     }
// }

(async () => {
    await checkPostgres();
    // await checkRedis();
})();
