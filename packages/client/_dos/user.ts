import { IClient } from '../_dtos/client';

export interface IUser {
  id?: number;
  identifier?: string;
  cpf: string;
  personalData: {
    name: string;
    phone: string;
    email: string;
  };
}

export function transformClientIntoUser(client: IClient): IUser {
  const { id, cpf, identifier } = client;
  const user = {
    id,
    cpf,
    identifier,
    personalData: {
      ...client,
    },
  } as IUser;

  return user;
}
