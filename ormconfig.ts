import { config } from './src/config/database.config';

export = {
  ...config,
  migrations: ['./src/migrations/**/*.ts'],
  entities: ['./src/modules/**/*.entity.{ts,js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
