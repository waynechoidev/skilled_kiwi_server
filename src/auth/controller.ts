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

const date = new Date();

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
  await userRepository.createUser({
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
  return res.status(201).json({ message: `Success to make user for ${username}` });
}

export async function signIn(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  const userId: string = user.id.toString();
  if (!user) {
    return res.status(401).json({ message: 'Invalid Username or Password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid Username or Password' });
  }
  const { refreshToken, accessToken } = createTokens(userId);
  res.status(201).json({
    userId,
    refreshToken,
    accessToken,
    expiredTime: (date.getTime() + accessTokenExpires * 1000).toString(),
  });
}

export async function reIssueToken(req: Request, res: Response) {
  const { refreshToken, userId }: { refreshToken: string; userId: string } = req.body;

  const isExistToken = await userRepository.checkRefreshToken(userId, refreshToken);
  if (isExistToken) {
    const { refreshToken, accessToken } = createTokens(userId);
    res.status(201).json({
      userId,
      refreshToken,
      accessToken,
      expiredTime: (date.getTime() + accessTokenExpires * 1000).toString(),
    });
  } else {
    return res.status(401).json({ message: 'refresh token is not valid' });
  }
}

// export async function me(req: Request, res: Response) {
//   const { userId } = res.locals;

//   const user = await userRepository.findById(userId);
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }
//   res.status(200).json({ username: user.username });
// }

export async function checkUsername(req: Request, res: Response) {
  const username: string = req.params.username;
  const user: userRepository.User = await userRepository.findByUsername(username);
  if (user?.username) {
    return res.json({ isValid: false });
  } else {
    return res.json({ isValid: true });
  }
}

export async function checkEmail(req: Request, res: Response) {
  const email: string = req.params.email;
  const user: userRepository.User = await userRepository.findByEmail(email);
  if (user?.email) {
    return res.json({ isValid: false });
  } else {
    return res.json({ isValid: true });
  }
}

function createTokens(userId: string) {
  const refreshToken = jwt.sign({ userId }, refreshTokenSecretKey, {
    expiresIn: refreshTokenExpires,
  });
  const accessToken = jwt.sign({ userId }, accessTokenSecretKey, {
    expiresIn: accessTokenExpires,
  });
  userRepository.storeRefreshToken(userId, refreshToken);
  return { refreshToken, accessToken };
}
