// user.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/user.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deveria criar um novo usuário', async () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    jest.spyOn(userRepository, 'create').mockReturnValue(user as any);
    jest.spyOn(userRepository, 'save').mockResolvedValue(user as any);

    const result = await service.create(user);
    expect(result).toEqual(user);
  });

  it('Não deveriar criar um usuário com email duplicado', async () => {
    const existingUser = {
      id: 1,
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'password456',
    };

    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValue(existingUser as any);

    const newUser = {
      name: 'New User',
      email: 'existing@example.com',
      password: 'password789',
    };

    await expect(service.create(newUser)).rejects.toThrowError(
      'Email already exists',
    );
  });
});
