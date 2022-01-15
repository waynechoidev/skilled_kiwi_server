import { Request, Response } from 'express';
import * as jobRepository from './data';

export async function getJobs(req: Request, res: Response) {
  const username: string = req.query.username as string;
  const data = await (username ? jobRepository.getAllByUsername(username) : jobRepository.getAll());
  res.status(200).json(data);
}

export async function getJob(req: Request, res: Response) {
  const id: string = req.params.id;
  const job = await jobRepository.getById(id);
  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).json({ message: `Job id(${id}) not found` });
  }
}

export async function createJob(req: Request, res: Response) {
  const text = req.body.text;
  const userId: string = res.locals.userId;
  const job: string = await jobRepository.create(text, userId);
  res.status(201).json(job);
}

export async function updateJob(req: Request, res: Response) {
  const id: string = req.params.id;
  const text: string = req.body.text;
  const job = await jobRepository.update(id, text);
  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).json({ message: `Job id(${id}) not found` });
  }
}

export async function deleteJob(req: Request, res: Response) {
  const id = req.params.id;
  await jobRepository.remove(id);
  res.sendStatus(204);
}
