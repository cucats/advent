import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { questionsTable, sessionsTable, usersTable } from './schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema: { usersTable, questionsTable, sessionsTable } });
