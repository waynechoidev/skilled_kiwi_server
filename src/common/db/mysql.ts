import * as mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'wayne',
  database: 'skilled_kiwi',
  password: '1jun90kr',
});

export const db = pool.promise();
