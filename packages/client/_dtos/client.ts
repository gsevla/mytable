export interface ICreateClient {
  cpf: string;
  email: string;
  name: string;
  phone: string;
}

export interface IClient {
  id: number;
  cpf: string;
  email: string;
  name: string;
  phone: string;
  identifier: string;
}
