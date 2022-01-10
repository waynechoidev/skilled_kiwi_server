interface iJob {
  id: string;
  text: string;
  createdAt: string;
  name: string;
  username: string;
}

let jobs: iJob[] = [
  {
    id: '1',
    text: 'first job',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
  },
  {
    id: '2',
    text: 'second job',
    createdAt: Date.now().toString(),
    name: 'Joy',
    username: 'joy',
  },
];

export async function getAll() {
  return jobs;
}

export async function getAllByUsername(username: string) {
  return jobs.filter((job) => job.username === username);
}

export async function getById(id: string) {
  return jobs.find((job) => job.id === id);
}

export async function create(text: string, name: string, username: string) {
  const job = {
    id: Date.now().toString(),
    text,
    createdAt: Date.now().toString(),
    name,
    username,
  };
  jobs = [job, ...jobs];
  return job;
}

export async function update(id: string, text: string) {
  const job = jobs.find((job) => job.id === id);
  if (job) {
    job.text = text;
  }
  return job;
}

export async function remove(id: string) {
  jobs = jobs.filter((job) => job.id !== id);
}
