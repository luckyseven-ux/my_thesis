import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST||'localhost',
  user: process.env.DB_USER||'root',
  password: process.env.DB_PASSWORD||'',
  database: process.env.DB_DATABASE||'percobaan',
  port: process.env.DB_PORT||3306,
});

export { db };
