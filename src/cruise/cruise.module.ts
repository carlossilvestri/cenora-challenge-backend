import { Module } from '@nestjs/common';
import { CruiseController } from './cruise.controller';
import { CruiseService } from './cruise.service';

@Module({
  controllers: [CruiseController],
  providers: [CruiseService],
})
export class CruiseModule {}
