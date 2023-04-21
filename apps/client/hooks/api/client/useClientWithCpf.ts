import { QueryOptions } from '@mytable/api-service';
import { Client } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useClientWithCpf(
  cpf: string,
  options: QueryOptions<Client> = {}
) {
  const apiService = useApiService();

  return apiService.resources.client.queries.useClientWithCpf(cpf, options);
}
