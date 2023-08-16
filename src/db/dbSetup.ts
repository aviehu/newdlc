import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { database } from "../envVars";

const pool = new Pool({
    connectionString: database.connectionString,
});

const db = drizzle(pool);


export default db

