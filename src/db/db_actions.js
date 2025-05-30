//import sql from 'better-sqlite3';
//const db = sql('./src/db/pomiary_db.sqlite');

import { Pool } from 'pg';

const pool = new Pool({
    connectionString:'postgres://neondb_owner:npg_1Dm8uWURLGSY@ep-old-meadow-abjpw8fa-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require',
    ssl: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
  });

  function convertToISO(dateStr) {
    // From "29.05.2025" to "2025-05-29"
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}`;
  }


  export async function fetchProgramsFromDB() {
      const query = 'SELECT * FROM programypomiarowe';
      const result = await pool.query(query);
      return result.rows;
    }
    
    // Fetch one program by ID
    export async function fetchDaneProgramuFromDB(id) {
      const query = 'SELECT * FROM programypomiarowe WHERE programid = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    }
    
    // Insert or update a program
    export async function saveProgramInDB(programname, programcode, date, time) {
      
      const query = `
        INSERT INTO programypomiarowe (programname, programcode, date, time)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (programname) DO UPDATE SET
          programcode = EXCLUDED.programcode,
          date = EXCLUDED.date,
          time = EXCLUDED.time
        RETURNING programid;
      `;
      const result = await pool.query(query, [programname, programcode, convertToISO(date), time]);
      return result.rows[0].programid;
    }
    
    // Insert or update a pomiar
    export async function savePomiarInDB(programid, pomiar, date, time) {
      const query = `
        INSERT INTO pomiary (programid, pomiar, date, time)
        VALUES ($1, $2, $3, $4);
       
      `;
      await pool.query(query, [programid, pomiar, convertToISO(date), time]);
    }
    
    // Fetch joined data for one report
    export async function fetchDaneRaportuFromDB(id) {
      const query = `
        SELECT pomiary.*, programypomiarowe.programname
        FROM pomiary
        JOIN programypomiarowe ON pomiary.programid = programypomiarowe.programid
        WHERE pomiary.pomiarid = $1
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    }
    
    // Fetch all report summaries
    export async function fetchAllReportsFromDB() {
      const query = `
        SELECT pomiary.pomiarid, pomiary.date, pomiary.time, programypomiarowe.programname
        FROM pomiary
        JOIN programypomiarowe ON pomiary.programid = programypomiarowe.programid
      `;
      const result = await pool.query(query);
      
      return result.rows;
    }