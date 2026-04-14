import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveDbUrl(): { url: string; authToken?: string } {
  const raw = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  // Remote Turso / libSQL
  if (raw && (raw.startsWith("libsql://") || raw.startsWith("https://"))) {
    return { url: raw, authToken };
  }

  // Explicit file: url — respect as-is if absolute, else resolve from cwd
  if (raw?.startsWith("file:")) {
    const p = raw.slice(5);
    if (path.isAbsolute(p)) return { url: raw };
    return { url: `file:${path.join(process.cwd(), p.replace(/^\.\//, ""))}` };
  }

  // Fallback local dev
  return { url: `file:${path.join(process.cwd(), "dev.db")}` };
}

function createPrismaClient() {
  const { url, authToken } = resolveDbUrl();
  const adapter = new PrismaLibSql(authToken ? { url, authToken } : { url });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
