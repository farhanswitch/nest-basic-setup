import { ConfigModule } from '@nestjs/config';

enum LIST_MODE {
  local = 'local',
  staging = 'staging',
}
export function configFactory(mode: keyof typeof LIST_MODE) {
  return ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/env/${LIST_MODE[mode]}.env`,
    isGlobal: true,
  });
}
