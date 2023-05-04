import { CreateReservationOrderWithClientIdentifierInput } from '@mytable/domain';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationOrderWithClientIdentifierDto
  implements CreateReservationOrderWithClientIdentifierInput
{
  @ApiProperty({ example: 'client-unique-identifier' })
  clientIdentifier: string;

  @ApiProperty({ example: 1 })
  environmentId: number;

  @ApiProperty({ example: 2 })
  peopleAmount: number;

  @ApiProperty({ example: '29/11/2022' })
  date: string;

  @ApiProperty({ example: '14:00' })
  startTime: string;

  @ApiProperty({ example: '15:00' })
  endTime: string;
}
