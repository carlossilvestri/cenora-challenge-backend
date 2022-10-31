import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CruiseModule } from './cruise/cruise.module';

@Module({
  imports: [CruiseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
