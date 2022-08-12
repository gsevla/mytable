import Constants from 'expo-constants';
import { createApiService } from '@mytable/api-service';

const apiService = createApiService(
  Constants?.manifest?.extra?.API_URL as string
);

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return apiService.createQueryClientProvider({ children });
}

export default {
  ...apiService,
  QueryClientProvider,
};
