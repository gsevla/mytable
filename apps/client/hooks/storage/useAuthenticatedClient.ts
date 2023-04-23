import { useEffect, useState } from 'react';
import { Client } from '@mytable/domain';
import { STORAGE_KEYS } from '~/services/storage/keys';
import { useStorageService } from './useStorageService';

export function useAuthenticatedClient() {
  const storageService = useStorageService();

  const [client, setClient] = useState<Client | null>(null);

  async function getClient() {
    const response = await storageService.getData<Client>(STORAGE_KEYS.client);

    if (response) {
      setClient(response);
    }
  }

  useEffect(() => {
    getClient();
  }, []);

  return client;
}
