import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Informazioni')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Restituisce informazioni generali sul software
   * @returns Informazioni generali sul software
   */
  @Get()
  getRoot(): string {
    return this.appService.getRoot();
  }
}
