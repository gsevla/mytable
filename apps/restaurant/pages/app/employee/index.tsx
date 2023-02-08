import { AppPageWrapper } from 'components/AppPageWrapper';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ApiService } from '#/services/api';

export default function AppEmployeePage() {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    const response = await ApiService.getInstance()
      .getService()
      ?.axiosInstance.get('/employee');
    setEmployees(response.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <AppPageWrapper>
      <View>
        <Text>Employee screen</Text>
        {employees.map((item) => (
          <Text>{item.name}</Text>
        ))}
      </View>
    </AppPageWrapper>
  );
}
