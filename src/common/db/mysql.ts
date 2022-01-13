import * as mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'skilled_kiwi',
});

export const db = pool.promise();
