import { UpdateWorkingDayInput, WorkingDay } from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createWorkingDayEndpoints(httpClient: HttpClientProtocol) {
  const url = 'working-day';

  function updateWorkingDay({ id, ...data }: UpdateWorkingDayInput) {
    return httpClient.patch<WorkingDay>(`${url}/${id}`, data);
  }

  return { updateWorkingDay };
}
