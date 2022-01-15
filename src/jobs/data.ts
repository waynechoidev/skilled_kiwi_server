import { db } from './../common/db/mysql';
interface Job {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
}

const SELECT_JOIN =
  'SELECT jo.id, jo.text, jo.createdAt, jo.userId, us.username, us.name, us.url FROM jobs as jo JOIN users as us ON jo.userId=us.id';
const ORDER_DESC = 'ORDER BY jo.createdAt DESC';

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result: any[]) => result[0]);
}

export async function getAllByUsername(username: string) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id: string) {
  return db.execute(`${SELECT_JOIN} WHERE jo.id=?`, [id]).then((result: any[]) => result[0][0]);
}

export async function create(text: string, userId: string) {
  return db
    .execute('INSERT INTO jobs (text, createdAt, userId) VALUES(?,?,?)', [text, new Date(), userId])
    .then((result: any[]) => getById(result[0].insertId));
}

export async function update(id: string, text: string) {
  return db.execute('UPDATE jobs SET text=? WHERE id=?', [text, id]).then(() => getById(id));
}

export async function remove(id: string) {
  return db.execute('DELETE FROM jobs WHERE id=?', [id]);
}
