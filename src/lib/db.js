import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // cleaner
  ssl: {
    rejectUnauthorized: false,
  },
});

export default {
  query: (text, params) => pool.query(text, params),
  pool,
};