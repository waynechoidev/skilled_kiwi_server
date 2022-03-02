import { Request, Response } from 'express';
import { getJobsQuery } from './../data/get_requests';
import * as jobRepository from './data';
import { Job } from './data';

export async function getJobs(req: Request, res: Response) {
  const { q, district, suburb, category }: getJobsQuery = req.query as getJobsQuery;
  const data = await jobRepository.get(q, district, suburb, category);
  res.status(200).json(data);
}

export async function getJob(req: Request, res: Response) {
  const id: string = req.params.id;
  const job = await jobRepository.getById(id);
  if (job) {
    res.status(200).json(job);
  } else {
    res.sendStatus(404);
  }
}

export async function createJob(req: Request, res: Response) {
  const { title, district, suburb, category, detail, images, pay }: Job = req.body;
  const value = { title, district, suburb, category, detail, images, pay };
  const userId: string = res.locals.userId;
  const job: string = await jobRepository.create(value, userId);
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
