import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CreateTodoDto} from "./dto/create-todo.dto";
import {Todo} from "../database/models/todo.model";
import {User} from "../database/models/user.model";
import {UserTodo} from "../database/models/user-todo.model";
import {todoRoles} from "../database/static/todo-roles.static";
import {UpdateTodoDto} from "./dto/update-todo.dto";
import {NotificationService} from "../shared/services/notification.service";

@Injectable()
export class TodoService {

  constructor(@Inject('DEVICES_REPOSITORY') private readonly todoRepository: typeof Todo,
              @Inject('USER_TODO_REPOSITORY') private readonly userTodosRepository: typeof UserTodo,
              @Inject('USERS_REPOSITORY') private readonly userRepository: typeof User,
              private readonly notificationService: NotificationService) {
  }

  async getUserTodos(userId: string): Promise<any> {
    const todos = await this.todoRepository.findAll({
      include: [
        {model: UserTodo, where: {userId}}
      ]
    });
    return todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      content: todo.content,
      category: todo.category,
      updated: todo.updatedAt,
      archived: todo.archived
    }));
  }

  async getUserTodo(todoId: string, userId: string): Promise<any> {
    const todo = await this.todoRepository.findOne({
      where: {id: todoId},
      include: [
        {model: UserTodo, where: {userId}}
      ]
    });
    if (todo) {
       return {
         id: todo.id,
         title: todo.title,
         content: todo.content,
         category: todo.category,
         updated: todo.updatedAt,
         archived: todo.archived
       }
    }
    throw new HttpException('Invalid todoId or you have no access', HttpStatus.NOT_FOUND);
  }

  async insertTodo(todo: CreateTodoDto, userId: string): Promise<string> {
    const savedTodo = await this.todoRepository.create({
      ...todo,
      ownerId: userId
    });
    if (savedTodo) {
      await this.userTodosRepository.create({
        userId,
        todoId: savedTodo.id,
        type: todoRoles.OWNER,
      });
      await this.notificationService.sendToAll(todo.title, todo.content);
    }
    return savedTodo?.id ?? null;
  }

  async updateTodoCategory(todoId: string, category: number, userId: string): Promise<string> {
    const hasAccess = await this.userTodosRepository.findAll({where: {todoId, userId}});
    if (!hasAccess) {
      throw new HttpException('You have no access', HttpStatus.UNAUTHORIZED);
    }

    const todo = await this.todoRepository.findByPk(todoId);
    if (!todo) {
      throw new HttpException('Invalid todo id', HttpStatus.NOT_FOUND);
    }

    await this.todoRepository.update({
      ...todo,
      category
    }, {where: {id: todoId}});
    return 'Updated';
  }

  async removeTodo(todoId: string, userId: string): Promise<string> {
    const hasAccess = await this.userTodosRepository.findOne({where: {todoId, userId}});
    if (hasAccess && hasAccess.type === todoRoles.OWNER) {
      const todo = await this.todoRepository.findByPk(todoId);
      await this.todoRepository.destroy({where: {id: todoId}});
      await this.notificationService.sendToAll(`<<${todo.title}>> has been removed`, todo.content);
      return 'REMOVED';
    } else {
      throw new HttpException('Only the owner can delete this todo', HttpStatus.UNAUTHORIZED);
    }
  }

  async updateTodo(todoId: string, update: UpdateTodoDto, userId: string): Promise<string> {
    const hasAccess = await this.userTodosRepository.findOne({where: {todoId, userId}});
    if (hasAccess && hasAccess.type === todoRoles.OWNER) {
      const todo = await this.todoRepository.findByPk(todoId);
      await this.todoRepository.update({...todo, ...update}, {where: {id: todoId}});
      await this.notificationService.sendToAll(`<<${todo.title}>> has been updated`, todo.content);
      return 'Updated';
    } else {
      throw new HttpException('Only the owner can delete this todo', HttpStatus.UNAUTHORIZED);
    }
  }

  async notifyTodo(todoId: string, userId: string): Promise<string> {
    const todo = await this.todoRepository.findOne({
      where: {id: todoId},
      include: [
        {model: UserTodo, where: {userId}}
      ]
    });
    if (todo) {
      await this.notificationService.sendToAll(`<<${todo.title}>> has been updated`, todo.content);
      return 'Notification has been sent';
    }
    throw new HttpException('Invalid todoId or you have no access', HttpStatus.NOT_FOUND);
  }
}
