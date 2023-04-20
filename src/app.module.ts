import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { DataModule } from './data/data.module';
import { ConnectionModule } from './connections/connections.module';

@Module({
  imports: [ConfigsModule, DataModule, ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
