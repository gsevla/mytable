import { Client } from '../../entities/Client';
import { UCProtocol } from '../protocol';

export type FindClientByCpfUC = UCProtocol<string, Promise<Client>>;
