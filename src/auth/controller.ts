import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as userRepository from './data';

// TODO: Make it secure!
const refreshTokenSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
const refreshTokenExpires = '14d';
const accessTokenSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
const accessTokenExpires = 7200;
const bcryptSaltRounds = 12;

export async function signUp(req: Request, res: Response) {
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
  } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId: string = await userRepository.createUser({
    username,
    password: hashed,
    email,
    firstName,
    lastName,
    gender,
    birthday,
    phoneNumberPrefix,
    phoneNumber,
    district,
    suburb,
  });
  const { refresh_token, access_token } = createTokens(userId);
  res
    .status(201)
    .json({ user_id: userId, refresh_token, access_token, expires_in: accessTokenExpires });
}

export async function signIn(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  const userId = user.id;
  if (!user) {
    return res.status(401).json({ message: 'Invalid Username or Password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid Username or Password' });
  }
  const { refresh_token, access_token } = createTokens(userId);
  res
    .status(201)
    .json({ user_id: userId, refresh_token, access_token, expires_in: accessTokenExpires });
}

export async function refreshToken(req: Request, res: Response) {
  const { refresh_token }: { refresh_token: string; user_id: string } = req.body;

  jwt.verify(refresh_token, 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z', async (error, decoded) => {
    if (error) {
      return res.status(401).json(error);
    }
    const userId = decoded!.id;
    const isExistToken = await userRepository.checkRefreshToken(userId);
    if (isExistToken) {
      const { refresh_token, access_token } = createTokens(userId);
      res
        .status(201)
        .json({ user_id: userId, refresh_token, access_token, expires_in: accessTokenExpires });
    } else {
      return res.status(401).json(error);
    }
  });
}

export async function me(req: Request, res: Response) {
  const { userId } = res.locals;

  const user = await userRepository.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ username: user.username });
}

export async function checkUsername(req: Request, res: Response) {
  const username: string = req.params.username;
  const user: userRepository.User = await userRepository.findByUsername(username);
  if (user?.username) {
    return res.json({ isValid: false });
  } else {
    return res.json({ isValid: true });
  }
}

function createTokens(userId: string) {
  const refresh_token = jwt.sign({ userId }, refreshTokenSecretKey, {
    expiresIn: refreshTokenExpires,
  });
  const access_token = jwt.sign({ userId }, accessTokenSecretKey, {
    expiresIn: accessTokenExpires,
  });
  return { refresh_token, access_token };
}
