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
  pay: number;
}

const SELECT_JOIN =
  'SELECT jo.id, jo.title, jo.district, jo.suburb, jo.category, jo.detail, jo.images, jo.createdAt, jo.userId, us.username, us.email, us.phone_number_prefix, us.phone_number FROM jobs as jo JOIN users as us ON jo.userId=us.id';
const ORDER_DESC = 'ORDER BY jo.createdAt DESC';

export async function get(q?: string, district?: string, suburb?: string, category?: string) {
  let query = '';

  if (q) {
    query += ` AND jo.title LIKE '%${q}%'`;
  }
  if (district) {
    query += ` AND jo.district='${district}'`;
  }
  if (suburb) {
    query += ` AND jo.suburb='${suburb}'`;
  }
  if (category) {
    query += ` AND jo.category='${category}'`;
  }

  query = query.replace(' AND', 'WHERE');
  console.log(query);
  return db
    .execute(
      `SELECT jo.id, jo.title, jo.district, jo.suburb, jo.category, jo.detail, jo.images, jo.createdAt, jo.userId, jo.pay, us.username FROM jobs as jo JOIN users as us ON jo.userId=us.id ${query} ${ORDER_DESC}`
    ) //
    .then((result: any[]) => result[0]);
}

export async function getById(id: string) {
  return db.execute(`${SELECT_JOIN} WHERE jo.id=?`, [id]).then((result: any[]) => result[0][0]);
}

export async function create(value: Job, userId: string) {
  const { title, district, suburb, category, detail, images, pay } = value;
  return db
    .execute(
      'INSERT INTO jobs (title, district, suburb, category, detail, images, pay, createdAt, userId) VALUES(?,?,?,?,?,?,?,?,?)',
      [title, district, suburb, category, detail, images, pay, new Date(), userId]
    )
    .then((result: any[]) => getById(result[0].insertId));
}

export async function update(id: string, text: string) {
  return db.execute('UPDATE jobs SET text=? WHERE id=?', [text, id]).then(() => getById(id));
}

export async function remove(id: string) {
  return db.execute('DELETE FROM jobs WHERE id=?', [id]);
}
