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


  export async function fetchProgramsFromDB(owner_email, limiter) {
      let query;
      let params;

      if(limiter) {
        query = 'SELECT * FROM programypomiarowe WHERE owner_email = $1 LIMIT $2';
        params = [owner_email, limiter];
      } else {
        query = 'SELECT * FROM programypomiarowe WHERE owner_email = $1';
        params = [owner_email];
      }
      
      const result = await pool.query(query, params);
      return result.rows;
    }
    
    // Fetch one program by ID
    export async function fetchDaneProgramuFromDB(id) {
      const query = 'SELECT * FROM programypomiarowe WHERE programid = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    }
    
    // Insert or update a program

    export async function saveProgramInDB(programname, programcode, date, time, owner_email) {

            
      const query = `
        INSERT INTO programypomiarowe (programname, programcode, date, time, owner_email)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (programname) DO UPDATE SET
          programcode = EXCLUDED.programcode,
          date = EXCLUDED.date,
          time = EXCLUDED.time,
          owner_email = EXCLUDED.owner_email
        RETURNING programid;
      `;
      const result = await pool.query(query, [programname, programcode, convertToISO(date), time, owner_email]);
      return result.rows[0].programid;
    }
    
    // Insert or update a pomiar
    export async function savePomiarInDB(progName, pomiar, date, time, owner_email) {
      const query = `
        INSERT INTO pomiary (programname, pomiar, date, time, owner_email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING pomiarid
      `;
      const result = await pool.query(query, [progName, pomiar, convertToISO(date), time, owner_email]);
      return result.rows[0].pomiarid;
    }
    
    // Fetch joined data for one report
    export async function fetchDaneRaportuFromDB(id) {
      const query = `
        SELECT pomiarid, pomiar, date, time, programname, owner_email
        FROM pomiary
        WHERE pomiary.pomiarid = $1
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    }
    
    // Fetch all report summaries
    export async function fetchAllReportsFromDB(owner_email) {
      const query = `
        SELECT pomiarid, date, time, programname
        FROM pomiary WHERE owner_email = $1
      `;
      const result = await pool.query(query, [owner_email]);
      
      return result.rows;
    }


     export async function fetchUserDataFromDB(owner_email) {
      const query = `
        SELECT *
        FROM users WHERE email = $1
      `;
      const result = await pool.query(query, [owner_email]);
      
      return result.rows[0];
    }

    export async function deleteFromDB(id, deleteFromTable) {
      let query;
      if(deleteFromTable === "pomiary") {
        query = `
        DELETE
        FROM pomiary WHERE pomiarid = $1
        RETURNING pomiarid;
      `;
      } else if (deleteFromTable === "programypomiarowe") {
        query = `
        DELETE
        FROM programypomiarowe WHERE programid = $1
        RETURNING programid;
      `;
      }

      
      const result = await pool.query(query, [id]);
      
      return result.rows[0];
    }