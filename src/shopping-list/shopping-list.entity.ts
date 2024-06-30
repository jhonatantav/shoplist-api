// src/entities/shopping-list.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../entities/user.entity';

@Entity()
export class ShoppingList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.shoppingLists)
  user: User;
}
