import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME || 'contatinhouser',
  password: process.env.DB_PASS || 'ultramegasecret',
  database: process.env.DB_DATABASE || 'contatinho',
  migrationsTableName: 'migrations',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/**/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  logging: false,
};

export default new DataSource(dataSourceOptions);
