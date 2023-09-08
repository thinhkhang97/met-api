import { Provider } from '@nestjs/common';

import { Login } from './login';
import { Register } from './register';
import { UpdateName } from './update-name';

export * from './register';

export const mutations: Provider[] = [Register, Login, UpdateName];
