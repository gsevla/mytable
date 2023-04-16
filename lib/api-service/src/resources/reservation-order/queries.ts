import { ReservationOrderWithClientData } from '@mytable/domain';
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

    const { data, isLoading } = useQuery<
      HttpOperationResult<Array<ReservationOrderWithClientData>>,
      unknown,
      Array<ReservationOrderWithClientData>
    >(key, () => reservationOrderEndpoints.getAllReservationOrder(), options);

    return {
      data: data?.data,
      isLoading,
    };
  }

  function useReservationOrderWithId(
    id: number,
    options: QueryOptions<ReservationOrderWithClientData> = {}
  ): QueryResult<ReservationOrderWithClientData> {
    const key = [reservationOrderQueryKeys.reservationOrder, id];

    const { data, isLoading } = useQuery<
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
    };
  }

  return {
    useReservationOrder,
    useReservationOrderWithId,
  };
}
