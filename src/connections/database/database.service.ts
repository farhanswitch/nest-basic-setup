import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import type { Connection } from 'mysql2';
import { MysqlService } from 'src/configs/databases/mysql/mysql.service';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private db: Connection;
  constructor(private readonly dbConfig: MysqlService) {}

  public async query<BindingType>(queryString: string, binding?: Array<BindingType>) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.db) this.handleConnect();
        resolve(((await this.db.promise().query(queryString, binding)) as unknown as [[unknown]])?.[0]?.[0]);
      } catch (error) {
        if ((error as { message: string })?.message === 'Cannot unquery after fatal error') this.handleReconnect();
        reject(error);
      }
    });
  }
  private handleConnect() {
    import('mysql2')
      .then((my) => {
        try {
          this.db = my.createConnection({
            ...this.dbConfig,
            timezone: '+00:00',
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  private handleDisconnect() {
    this.db.destroy();
  }
  private handleReconnect() {
    this.handleDisconnect();
    setTimeout(() => {
      this, this.handleConnect();
    }, 3000);
  }
  onModuleInit() {
    this.handleConnect();
  }
  onApplicationShutdown(_signal?: string) {
    this.handleDisconnect();
  }
}
