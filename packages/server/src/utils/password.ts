import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
}

export async function decryptPassword(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash);

  return result;
}
