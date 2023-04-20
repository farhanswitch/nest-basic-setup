import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/configs/databases/mysql/mysql.service';
import { DatabaseService } from 'src/connections/database/database.service';

@Injectable()
export class DataService {
  constructor(private readonly mysqlConf: MysqlService, private readonly database: DatabaseService) {}

  getMysqlConf() {
    return this.mysqlConf;
  }
  public async tryDb() {
    return await this.database.query('SELECT NOW();');
  }
}
