import { JobCategory } from 'data/post_request';
import { District, Suburb } from 'data/user';
import { db } from './../common/db/mysql';
export interface Job {
  title: string;
  district: District;
  suburb: Suburb;
  category: JobCategory;
  detail: string;
  images: string[];
}

const SELECT_JOIN =
  'SELECT jo.id, jo.title, jo.district, jo.suburb, jo.category, jo.detail, jo.images, jo.createdAt, jo.userId, us.username, us.email,us.first_name, us.last_name, us.gender, us.birthday, us.phone_number_prefix, us.phone_number, us.district, us.suburb FROM jobs as jo JOIN users as us ON jo.userId=us.id';
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

export async function create(value: Job, userId: string) {
  const { title, district, suburb, category, detail, images } = value;
  return db
    .execute(
      'INSERT INTO jobs (title, district, suburb, category, detail, images, createdAt, userId) VALUES(?,?,?,?,?,?,?,?)',
      [title, district, suburb, category, detail, images, new Date(), userId]
    )
    .then((result: any[]) => getById(result[0].insertId));
}

export async function update(id: string, text: string) {
  return db.execute('UPDATE jobs SET text=? WHERE id=?', [text, id]).then(() => getById(id));
}

export async function remove(id: string) {
  return db.execute('DELETE FROM jobs WHERE id=?', [id]);
}
