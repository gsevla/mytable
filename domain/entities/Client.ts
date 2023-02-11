export interface Client {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  cpf: string;
  identifier: string;
}

export interface CreateClientInput extends Omit<Client, 'id' | 'identifier'> {}

export interface CreateClientOutput extends Client {}
