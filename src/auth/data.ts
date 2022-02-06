import { db } from './../common/db/mysql';

const tokenDb: any = {};
export interface User {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  phoneNumberPrefix: string;
  phoneNumber: string;
  district: string;
  suburb: string;
}

export async function findByUsername(username: string) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username]) //
    .then((result: any[]) => result[0][0]);
}

export async function findByEmail(email: string) {
  return db
    .execute('SELECT * FROM users WHERE email=?', [email]) //
    .then((result: any[]) => result[0][0]);
}

export async function findById(id: string) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id]) //
    .then((result: any[]) => result[0][0]);
}

export async function createUser(user: User) {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    gender,
    birthday,
    phoneNumberPrefix,
    phoneNumber,
    district,
    suburb,
  } = user;
  return db
    .execute(
      'INSERT INTO users(username, password, email, first_name, last_name, gender, birthday, phone_number_prefix, phone_number, district, suburb) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [
        username,
        password,
        email,
        firstName,
        lastName,
        gender,
        birthday,
        phoneNumberPrefix,
        phoneNumber,
        district,
        suburb,
      ]
    )
    .then((result: any[]) => result[0].insertId);
}

export async function storeRefreshToken(userId: string, token: string) {
  tokenDb[userId] = token;
}
export async function checkRefreshToken(userId: string, token: String) {
  if (tokenDb[userId] === token) {
    return true;
  } else {
    return false;
  }
}
