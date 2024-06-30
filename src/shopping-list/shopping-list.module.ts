// src/shopping-list/shopping-list.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingList } from '../entities/shopping-list.entity';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingList])],
  providers: [ShoppingListService],
  controllers: [ShoppingListController],
})
export class ShoppingListModule {}
