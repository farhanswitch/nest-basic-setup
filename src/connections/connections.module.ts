import { Module } from '@nestjs/common';
import { ConfigsModule } from 'src/configs/configs.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [ConfigsModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class ConnectionModule {}
