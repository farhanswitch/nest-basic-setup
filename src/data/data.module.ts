import { Module } from '@nestjs/common';
import { ConfigsModule } from 'src/configs/configs.module';
import { ConnectionModule } from 'src/connections/connections.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [ConfigsModule, ConnectionModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
