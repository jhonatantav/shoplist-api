import { DataSource } from 'typeorm';
import { ShoppingList } from './entities/shopping-list.entity';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, ShoppingList],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
