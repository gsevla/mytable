import Constants from 'expo-constants';
import { createApiService } from '@mytable/api-service';

export class ApiService {
  private static instance: ApiService | null = null;

  private apiService: ReturnType<typeof createApiService> | null = null;

  static getInstance(): ApiService {
    if (ApiService.instance === null) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  static isLoaded = false;

  loadService() {
    if (ApiService.isLoaded) return;

    this.apiService = createApiService(
      Constants?.manifest?.extra?.API_URL as string
    );
    ApiService.isLoaded = true;
  }

  getQueryClientProvider() {
    return this.apiService?.QueryClientProvider;
  }

  getService(): ReturnType<typeof createApiService> {
    return this.apiService as ReturnType<typeof createApiService>;
  }
}
