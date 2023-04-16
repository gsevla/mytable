import React from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Button, Subheading } from 'react-native-paper';
import { useRouter } from 'next/router';
import AppPageContentHeaderComponent from 'components/AppPageContentHeader';
import { SizedBox } from 'components/SizedBox';
import { useStorageService } from '#/hooks/storage';
import { STORAGE_KEYS } from '#/services/storage/keys';

interface IAppPageWrapper {
  children: React.ReactNode;
  isLoading?: boolean;
}

const routeNameMap = {
  dashboard: 'Dashboard',
  employee: 'Funcionários',
  'reservation-order': 'Ordens de reserva',
  restaurant: 'Restaurante',
  'waiting-line': 'Fila de espera',
  environment: 'Ambientes',
} as const;

const crudOperationsNameMap = {
  list: '',
  create: '',
  edit: '',
} as const;

const routesExcludedFromCrudOperations = ['dashboard', 'restaurant'];

function getPathnameInfo(pathname: string) {
  const pathParts = pathname.split('/');
  pathParts.shift();

  const routeName = pathParts[1];
  const crudOperationName = pathParts?.[2] ?? 'list';

  return { routeName, crudOperationName };
}

export function AppPageWrapper({
  children,
  isLoading = true,
}: IAppPageWrapper) {
  const { pathname, ...router } = useRouter();
  const storageService = useStorageService();
  const dimensions = useWindowDimensions();

  const pathnameInfo = getPathnameInfo(pathname);

  const shouldShowBackButton = pathnameInfo.crudOperationName !== 'list';
  const shouldShowPlustButton =
    pathnameInfo.crudOperationName === 'list' &&
    !routesExcludedFromCrudOperations.includes(pathnameInfo.routeName);

  const routeName = (routeNameMap[pathnameInfo.routeName] ?? '') as string;
  const crudOperationName = (crudOperationsNameMap[
    pathnameInfo.crudOperationName
  ] ?? '') as string;

  function generateTitle() {
    let name: string;
    if (crudOperationName) {
      name = `${crudOperationName} ${routeName}`;
    } else {
      name = routeName;
    }

    return name ?? '';
  }

  const title = generateTitle();

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View
        style={{
          flex: 0.2,
          borderRightWidth: 1,
          borderRightColor: '#ccc',
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          padding: 16,

          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Subheading>Geral</Subheading>
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/dashboard');
              }}
            >
              Dashboard
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/reservation-order');
              }}
            >
              Ordens de Reserva
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/waiting-line');
              }}
            >
              Fila de Espera
            </Button>
          </View>
          <SizedBox />
          <Subheading>Admin</Subheading>
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/restaurant');
              }}
            >
              Restaurante
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/environment');
              }}
            >
              Ambientes
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/employee');
              }}
            >
              Funcionários
            </Button>
          </View>
        </View>
        <View>
          <Button
            mode='text'
            onPress={async () => {
              await storageService.destroyData(STORAGE_KEYS.ACCESS_TOKEN);
              await storageService.destroyData(STORAGE_KEYS.EMPLOYEE);
              await router.push('/auth');
            }}
          >
            Sair
          </Button>
        </View>
      </View>
      <View
        style={{
          flex: 0.8,
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: dimensions.height,
        }}
      >
        <View
          style={{
            height: '90%',
            width: '90%',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            padding: 16,
          }}
        >
          <AppPageContentHeaderComponent
            title={title}
            showCloseButton={!isLoading && shouldShowBackButton}
            onPressCloseButton={router.back}
            showPlusButton={!isLoading && shouldShowPlustButton}
            onPressPlusButton={() => {
              router.push(`${router.route}/create`);
            }}
          />
          {isLoading ? (
            <ActivityIndicator
              animating
              size='large'
            />
          ) : (
            <ScrollView>{children}</ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
