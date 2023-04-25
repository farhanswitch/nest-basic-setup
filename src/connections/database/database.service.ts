import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import type { Connection } from 'mysql2';
import { MysqlService } from 'src/configs/databases/mysql/mysql.service';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private db: Connection;
  constructor(private readonly dbConfig: MysqlService) {}

  public async query<ValueType>(queryString: string, values?: Array<ValueType>) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.db) this.handleConnect();
        resolve(((await this.db.promise().query(queryString, values)) as unknown as [[unknown]])?.[0]?.[0]);
      } catch (error) {
        this.handleError(error as Error & { code: string });
        reject(error);
      }
    });
  }
  public async rawQuery<ValueType>(queryString: string, values?: Array<ValueType>) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.db) this.handleConnect();
        resolve(((await this.db.promise().query(queryString, values)) as unknown as [unknown])?.[0]);
      } catch (error) {
        this.handleError(error as Error & { code: string });
        reject(error);
      }
    });
  }
  private handleError(error: Error & { code: string }): void {
    if (error.message.match(/Cannot enqueue Query after fatal error/i) || error?.code === 'PROTOCOL_CONNECTION_LOST') {
      this.handleReconnect();
      console.log(`RECOVER FROM FATAL ERROR ${new Date().toString()}`);
    }
  }
  private handleConnect() {
    import('mysql2')
      .then((module) => {
        try {
          this.db = module.createConnection({
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
