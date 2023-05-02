import io, { Socket } from 'socket.io-client';
import {
  SocketClientProtocol,
  EventListener,
} from '../../protocols/SocketClient';

export class SocketIoClientAdapter implements SocketClientProtocol {
  private socket: Socket = null;

  private alreadyConnectedOnce = false;

  constructor(socketUrl: string) {
    this.socket = io(socketUrl, {
      autoConnect: false,
      transports: ['websocket'],
    });
    this.socket.onAny((event, ...args) => {
      console.log(`## ${event} arrived\n`, args);
    });
  }

  connect(
    username: string,
    handlers?: { onConnect?: () => void; onDisconnect?: () => void }
  ): void {
    if (this.alreadyConnectedOnce) return;

    this.socket.auth = {
      username,
    };

    this.socket.on('connect_error', (err) => {
      console.log('socket_connection_error', err);
    });

    if (handlers.onConnect) {
      this.socket.on('connection', handlers.onConnect);
    }

    if (handlers.onDisconnect) {
      this.socket.on('disconnect', handlers.onDisconnect);
    }

    this.socket.connect();
    this.alreadyConnectedOnce = true;
  }

  emit<TData = unknown>(event: string, data: TData): void {
    this.socket.emit(event, data);
  }

  on<TData = unknown>(
    event: string,
    handler: (data: TData) => void
  ): EventListener {
    return this.socket.on(event, handler);
  }

  removeListener(eventName: string, listener: Function): void {
    this.socket.off(eventName, listener);
  }

  remove(eventName?: string) {
    this.socket.removeAllListeners(eventName);
  }

  isConnected(): boolean {
    return this.socket.connected;
  }
}
