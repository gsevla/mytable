import { MutationOptions } from '@mytable/api-service';
import { Client } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useSignInClient(options: MutationOptions<Client> = {}) {
  const apiService = useApiService();

  return apiService.resources.auth.mutations.useSignInClient(options);
}
