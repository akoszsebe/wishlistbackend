import {Module} from '@nestjs/common';
import {databaseProviders} from './providers/database.provider';
import {devicesProviders} from './providers/device.provider';
import {todosProviders} from './providers/todo.provider';
import {usersProviders} from './providers/user.provider';

@Module({
  providers: [
    ...databaseProviders,
    ...devicesProviders,
    ...todosProviders,
    ...usersProviders
  ],
  exports: [
    ...databaseProviders,
    ...devicesProviders,
    ...todosProviders,
    ...usersProviders
  ],
})
export class DatabaseModule {
}