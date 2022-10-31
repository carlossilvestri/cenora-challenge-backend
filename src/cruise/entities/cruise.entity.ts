import { ApiProperty } from '@nestjs/swagger';
export class Cruise {
  @ApiProperty({
    example: 'Mardi Gras',
  })
  title: string;
  @ApiProperty({
    example: 'Caribbean',
  })
  sail_to: string;
  @ApiProperty({
    example: 'Port Canaveral (Orlando), FL',
  })
  sail_from: string;
  @ApiProperty({
    example: '6-9 Days',
  })
  duration: string;
  @ApiProperty({
    example:
      'https://www.carnival.com/-/media/images/explore/icons/newly-introduced.png',
  })
  image: string;
}
