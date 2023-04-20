import { Injectable } from '@nestjs/common';

import type { DBConfigProto } from './mysql.interface';

@Injectable()
export class MysqlService implements DBConfigProto {
  public readonly host: string = process.env.DB_HOST as string;
  public readonly database: string = process.env.DB_NAME as string;
  public readonly user: string = process.env.DB_USER as string;
  public readonly password: string = process.env.DB_PASS as string;
  public readonly port: number = +process.env.DB_PORT as unknown as number;
}
