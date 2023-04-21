import { createStorageService } from '@mytable/storage-service';
import { STORAGE_KEYS } from './keys';

export class StorageService {
  private static instance: StorageService | null = null;

  private storageService: ReturnType<typeof createStorageService> | null = null;

  static getInstance(): StorageService {
    if (StorageService.instance === null) {
      StorageService.instance = new StorageService(STORAGE_KEYS);
    }

    return StorageService.instance;
  }

  static isLoaded = false;

  private keys: typeof STORAGE_KEYS;

  private constructor(keys: typeof STORAGE_KEYS) {
    this.keys = keys;
  }

  loadService() {
    if (StorageService.isLoaded) return;

    this.storageService = createStorageService<typeof STORAGE_KEYS>(this.keys);
    StorageService.isLoaded = true;
  }

  getService(): ReturnType<typeof createStorageService> {
    return this.storageService as ReturnType<typeof createStorageService>;
  }
}
