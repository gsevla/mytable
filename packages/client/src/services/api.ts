import Constants from 'expo-constants';
import { createApiService } from '@mytable/api-service';

const _apiService = createApiService(Constants?.manifest?.extra?.API_URL);

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return _apiService.createQueryClientProvider({ children });
}

export default {
  ..._apiService,
  QueryClientProvider,
};
