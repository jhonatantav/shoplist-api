// src/shopping-list/shopping-list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingList } from '../entities/shopping-list.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingList)
    private shoppingListRepository: Repository<ShoppingList>,
  ) {}

  async findAllByUser(userId: number): Promise<ShoppingList[]> {
    return this.shoppingListRepository.find({
      where: { user: { id: userId } },
    });
  }

  async create(
    userId: number,
    createShoppingListDto: Partial<ShoppingList>,
  ): Promise<ShoppingList> {
    const shoppingList = new ShoppingList();
    shoppingList.user = { id: userId } as User;
    shoppingList.item = createShoppingListDto.item;
    shoppingList.quantity = createShoppingListDto.quantity;
    return this.shoppingListRepository.save(shoppingList);
  }

  async update(
    id: number,
    updateShoppingListDto: Partial<ShoppingList>,
  ): Promise<ShoppingList> {
    await this.shoppingListRepository.update(id, updateShoppingListDto);
    return this.shoppingListRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.shoppingListRepository.delete(id);
  }
}
