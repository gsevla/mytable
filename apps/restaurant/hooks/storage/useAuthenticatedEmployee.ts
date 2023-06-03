import { useEffect, useState } from 'react';
import { Employee } from '@mytable/domain';
import { useStorageService } from '.';
import { STORAGE_KEYS } from '#/services/storage/keys';

export function useAuthenticatedEmployee() {
  const storageService = useStorageService();

  const [employee, setEmployee] = useState<Employee | null>(null);

  async function getEmployee() {
    const response = await storageService.getData<Employee>(
      STORAGE_KEYS.EMPLOYEE
    );

    if (response) {
      setEmployee(response);
    }
  }

  useEffect(() => {
    getEmployee();
  }, []);

  return employee;
}
