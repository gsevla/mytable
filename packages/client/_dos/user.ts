import { ClientDto } from '@mytable/dtos';

export interface IUser {
  id?: number;
  identifier?: string;
  cpf: string;
  personalData: {
    name: string;
    surname: string;
    phone: string;
    email: string;
  };
}

export function transformClientIntoUser(client: ClientDto.IClient): IUser {
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

export function transformUserIntoClient(user: IUser): ClientDto.IClient {
  const { personalData } = user;
  const client = {
    ...user,
    ...personalData,
  } as ClientDto.IClient;

  return client;
}
