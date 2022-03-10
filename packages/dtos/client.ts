export interface IClient {
  id: number;
  cpf: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  identifier: string;
}

export interface ICreateClient {
  cpf: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
}
