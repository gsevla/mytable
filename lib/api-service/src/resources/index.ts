import { HttpClientProtocol } from '../protocols/HttpClient';
import { createAuth } from './auth';
import { createClientResource } from './client';
import { createEmployeeResource } from './employee';
import { createRestaurantResource } from './restaurant';
import { createEnvironmentResource } from './environment';
import { createEnvironmentImageResource } from './environment-image';
import { createReservationOrderResource } from './reservation-order';
import { SocketClientProtocol } from '../protocols/SocketClient';
import { createWaitingQueueResource } from './waiting-queue';
import { createWorkingDayResource } from './working-day';

export function createResources(
  httpClient: HttpClientProtocol,
  socketClient: SocketClientProtocol
) {
  const resources = {
    auth: createAuth(httpClient),
    client: createClientResource(httpClient),
    restaurant: createRestaurantResource(httpClient),
    employee: createEmployeeResource(httpClient),
    environment: createEnvironmentResource(httpClient),
    environmentImage: createEnvironmentImageResource(httpClient),
    reservationOrder: createReservationOrderResource(httpClient, socketClient),
    waitingQueue: createWaitingQueueResource(httpClient, socketClient),
    workingDay: createWorkingDayResource(httpClient),
  };

  return resources;
}
