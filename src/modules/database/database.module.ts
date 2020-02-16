import {Module} from '@nestjs/common';
import {databaseProviders} from './providers/database.provider';
import {devicesProviders} from './providers/device.provider';
import {todosProviders} from './providers/todo.provider';
import {usersProviders} from './providers/user.provider';
import {userTodosProviders} from "./providers/user-todo.provider";

@Module({
  providers: [
    ...databaseProviders,
    ...devicesProviders,
    ...todosProviders,
    ...usersProviders,
    ...userTodosProviders
  ],
  exports: [
    ...databaseProviders,
    ...devicesProviders,
    ...todosProviders,
    ...usersProviders,
    ...userTodosProviders
  ],
})
export class DatabaseModule {
}