import { Module } from '@nestjs/common';
import { CruiseController } from './cruise.controller';
import { CruiseService } from './cruise.service';
import Puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
@Module({
  controllers: [CruiseController],
  providers: [
    CruiseService,
    {
      provide: 'PuppeteerStealth',
      useValue: Puppeteer.use(StealthPlugin()),
    },
  ],
})
export class CruiseModule {}
