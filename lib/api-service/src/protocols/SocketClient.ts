export interface SocketClientProtocol {
  connect(
    username: string,
    handlers?: {
      onConnect?: () => void;
      onDisconnect?: (reason?: string) => void;
    }
  ): void;

  emit<TData = unknown>(event: string, data: TData): void;

  on<TData = unknown>(event: string, handler: (data: TData) => void): void;

  removeListener(eventName: string, listener: Function): void;

  remove(eventName?: string): void;

  isConnected(): boolean;
}
