import { CreateClientInput, CreateClientOutput } from '../../entities/Client';
import { UCProtocol } from '../protocol';

export type CreateClientUC = UCProtocol<
  CreateClientInput,
  Promise<CreateClientOutput>
>;
