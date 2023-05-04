import {
  JoinWaitingQueueInput,
  LeaveWaitingQueueInput,
  WaitingQueueClient,
} from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createWaitingQueueEndpoints(httpClient: HttpClientProtocol) {
  const url = '/waiting-queue';

  function joinWaitingQueue(data: JoinWaitingQueueInput) {
    return httpClient.post<void>(`${url}/join`, data);
  }

  function leaveWaitingQueue(data: LeaveWaitingQueueInput) {
    return httpClient.post<void>(`${url}/leave`, data);
  }

  function getWaitingQueue() {
    return httpClient.get<Array<WaitingQueueClient>>(url);
  }

  function attendWaitingQueue() {
    return httpClient.post(`${url}/attend`);
  }

  return {
    getWaitingQueue,
    joinWaitingQueue,
    leaveWaitingQueue,
    attendWaitingQueue,
  };
}
