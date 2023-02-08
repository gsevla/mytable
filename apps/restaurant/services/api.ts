import Constants from 'expo-constants';
import { createApiService } from '@mytable/api-service';

export class ApiService {
  private static instance: ApiService | null = null;

  static getInstance() {
    if (ApiService.instance === null) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  private constructor() {}

  private apiService: Awaited<ReturnType<typeof createApiService>> | undefined;

  async loadService() {
    this.apiService = await createApiService(
      Constants?.manifest?.extra?.API_URL as string
    );
  }

  getQueryClientProvider() {
    return this.apiService?.QueryClientProvider;
  }

  getService() {
    return this.apiService;
  }
}
