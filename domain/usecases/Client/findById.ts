import { Client } from '../../entities/Client';
import { UCProtocol } from '../protocol';

export type FindClientByIdUC = UCProtocol<number, Promise<Client>>;
