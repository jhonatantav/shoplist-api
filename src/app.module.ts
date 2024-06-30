// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { ShoppingList } from './entities/shopping-list.entity';
import { User } from './entities/user.entity';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { UsersModule } from './users/user.module';

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, ShoppingList],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ShoppingListModule,
  ],
})
export class AppModule {}
