import { SocketClientProtocol } from '@mytable/api-service/src/protocols/SocketClient';
import { ApiService } from '../api';

export class EventsService {
  private static instance: EventsService | null = null;

  private socketClient: SocketClientProtocol | null = null;

  private apiService = ApiService.getInstance().getService();

  private queryClient = this.apiService.queryClient;

  static getInstance(): EventsService {
    if (EventsService.instance === null) {
      EventsService.instance = new EventsService();
    }

    return EventsService.instance;
  }

  static isLoaded = false;

  private constructor() {
    this.socketClient = this.apiService.socketClient;
  }

  private listenToReservationOrderEvents() {
    this.apiService.resources.reservationOrder.events.listenToReservationOrderChanges(
      () => {
        this.queryClient.invalidateQueries([
          this.apiService.resources.reservationOrder.queryKeys.reservationOrder,
        ]);
      }
    );
  }

  loadService(username: string) {
    if (EventsService.isLoaded) return;

    this.listenToReservationOrderEvents();
    console.log('listening events!');

    this.socketClient?.connect(username, {
      onConnect: () => {
        console.log(`client ${username} connected!`);
      },
    });

    EventsService.isLoaded = true;
  }

  getService(): SocketClientProtocol {
    return this.socketClient as SocketClientProtocol;
  }
}
