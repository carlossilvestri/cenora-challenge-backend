import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CruiseService } from './cruise.service';
import { Cruise } from './entities';

@ApiTags('cruise')
@Controller('cruise')
export class CruiseController {
  constructor(private cruiseService: CruiseService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Cruises', type: Cruise })
  findAll() {
    return this.cruiseService.findAll();
  }
}
