import { User } from './user.entity';

export const usersProviders = [{ provide: 'UserRepository', useValue: User }];
