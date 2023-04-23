import {
  ReservationOrder,
  ReservationOrderWithClientData,
  ReservationOrderWithEnvironmentData,
  ReservationOrderWithReservationOrderHistoryData,
} from '@mytable/domain';
import { useQuery } from 'react-query';
import { HttpOperationResult } from '../../protocols/HttpClient';
import { createReservationOrderEndpoints } from './http';
import { reservationOrderQueryKeys } from './keys';
import { QueryOptions } from '../../protocols/QueryOptions';
import { QueryResult } from '../../protocols/QueryClient';

export function createReservationOrderQueries(
  reservationOrderEndpoints: ReturnType<typeof createReservationOrderEndpoints>
) {
  function useReservationOrder(
    options: QueryOptions<Array<ReservationOrderWithClientData>> = {}
  ): QueryResult<Array<ReservationOrderWithClientData>> {
    const key = [reservationOrderQueryKeys.reservationOrder];

    const { data, isLoading, isRefetching, refetch } = useQuery<
      HttpOperationResult<Array<ReservationOrderWithClientData>>,
      unknown,
      Array<ReservationOrderWithClientData>
    >(key, () => reservationOrderEndpoints.getAllReservationOrder(), options);

    return {
      data: data?.data,
      isLoading,
      isRefetching,
      refetch,
    };
  }

  function useActiveReservationOrder(
    options: QueryOptions<
      Array<
        ReservationOrderWithEnvironmentData | ReservationOrderWithClientData
      >
    > = {}
  ): QueryResult<
    Array<ReservationOrderWithEnvironmentData | ReservationOrderWithClientData>
  > {
    const key = [reservationOrderQueryKeys.reservationOrder, 'active'];

    const { data, isLoading, isRefetching, refetch } = useQuery<
      HttpOperationResult<
        Array<
          ReservationOrderWithEnvironmentData | ReservationOrderWithClientData
        >
      >,
      unknown,
      Array<
        ReservationOrderWithEnvironmentData | ReservationOrderWithClientData
      >
    >(
      key,
      () => reservationOrderEndpoints.getAllActiveReservationOrder(),
      options
    );

    return {
      data: data?.data,
      isLoading,
      isRefetching,
      refetch,
    };
  }

  function useReservationOrderHistory(
    options: QueryOptions<
      Array<
        | (ReservationOrderWithEnvironmentData &
            ReservationOrderWithReservationOrderHistoryData)
        | ReservationOrderWithClientData
      >
    > = {}
  ): QueryResult<
    Array<
      | (ReservationOrderWithEnvironmentData &
          ReservationOrderWithReservationOrderHistoryData)
      | ReservationOrderWithClientData
    >
  > {
    const key = [reservationOrderQueryKeys.reservationOrder, 'history'];

    const { data, isLoading, isRefetching, refetch } = useQuery<
      HttpOperationResult<
        Array<
          | (ReservationOrderWithEnvironmentData &
              ReservationOrderWithReservationOrderHistoryData)
          | ReservationOrderWithClientData
        >
      >,
      unknown,
      Array<
        | (ReservationOrderWithEnvironmentData &
            ReservationOrderWithReservationOrderHistoryData)
        | ReservationOrderWithClientData
      >
    >(
      key,
      () => reservationOrderEndpoints.getAllReservationOrderHistory(),
      options
    );

    return {
      data: data?.data,
      isLoading,
      isRefetching,
      refetch,
    };
  }

  function useReservationOrderWithId(
    id: number,
    options: QueryOptions<ReservationOrderWithClientData> = {}
  ): QueryResult<ReservationOrderWithClientData> {
    const key = [reservationOrderQueryKeys.reservationOrder, id];

    const { data, isLoading, isRefetching, refetch } = useQuery<
      HttpOperationResult<ReservationOrderWithClientData>,
      unknown,
      ReservationOrderWithClientData
    >(
      key,
      ({ queryKey }) =>
        reservationOrderEndpoints.getReservationOrderById(
          queryKey[1] as number
        ),
      options
    );

    return {
      data: data?.data,
      isLoading,
      isRefetching,
      refetch,
    };
  }

  return {
    useReservationOrder,
    useActiveReservationOrder,
    useReservationOrderHistory,
    useReservationOrderWithId,
  };
}
