import { db } from './../common/db/mysql';
export interface User {
  username: string;
  password: string;
  name: string;
  email: string;
  url: string;
}

export async function findByUsername(username: string) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username]) //
    .then((result: any[]) => result[0][0]);
}

export async function findById(id: string) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id]) //
    .then((result: any[]) => result[0][0]);
}

export async function createUser(user: User) {
  const { username, password, name, email, url } = user;
  return db
    .execute('INSERT INTO users(username, password, name, email, url) VALUES (?,?,?,?,?)', [
      username,
      password,
      name,
      email,
      url,
    ])
    .then((result: any[]) => result[0].insertId);
}
