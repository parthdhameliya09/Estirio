import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
console.log("db url", process.env.DATABASE_URL);

export const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
});
pool.on("error", (err) => {
   console.error("POOL ERROR:", err);
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
