import { Todo } from '../models/todo.model';

export const todosProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useValue: Todo,
  },
];