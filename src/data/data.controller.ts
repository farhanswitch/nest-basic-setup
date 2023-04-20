import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Get('/config/mysql')
  getMysqlConfig() {
    return this.service.getMysqlConf();
  }
  @Get('/db/query')
  getDBNow() {
    return this.service.tryDb();
  }
}
