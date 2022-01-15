import { db } from './../common/db/mysql';
export interface User {
  username: string;
  password: string;
  name: string;
  email: string;
  url: string;
}

// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

export async function findByUsername(username: string) {
  return users.find((user) => user.username === username);
}

export async function findById(id: string) {
  return users.find((user) => user.id === id);
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
