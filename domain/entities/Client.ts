export interface Client {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  cpf: string;
  identifier: string;
}

export type CreateClientInput = Omit<Client, 'id' | 'identifier'>;

export type CreateClientOutput = Client;
