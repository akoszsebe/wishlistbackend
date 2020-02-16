import {UserTodo} from "../models/user-todo.model";

export const userTodosProviders = [
  {
    provide: 'USER_TODO_REPOSITORY',
    useValue: UserTodo,
  },
];