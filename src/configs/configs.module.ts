import { Module } from '@nestjs/common';
import { configFactory } from './configs.factory';
import { MysqlService } from './databases/mysql/mysql.service';

@Module({
  imports: [configFactory('local')],
  providers: [MysqlService],
  exports: [MysqlService],
})
export class ConfigsModule {}
