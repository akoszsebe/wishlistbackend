import {Body, Controller, Delete, Get, Param, Headers, Post, Put} from '@nestjs/common';
import { TodoService } from './todo.service';
import {CreateTodoDto} from "./dto/create-todo.dto";
import {TodoCategoryDto} from "./dto/todo-category.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";


@Controller('/tudos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  userTodos(@Headers('Authorization') userId: string): Promise<any> {
    return this.todoService.getUserTodos(userId);
  }

  @Get('/:todoId')
  userTodo(@Param('todoId') todoId: string, @Headers('Authorization') userId: string): Promise<any> {
    return this.todoService.getUserTodo(todoId, userId);
  }

  @Get('notify/:todoId')
  notifyTodo(@Param('todoId') todoId: string, @Headers('Authorization') userId: string): Promise<any> {
    return this.todoService.notifyTodo(todoId, userId);
  }

  @Post()
  createTodo(@Body() todo: CreateTodoDto, @Headers('Authorization') userId: string): Promise<string> {
    return this.todoService.insertTodo(todo, userId);
  }

  @Put('/:todoId')
  updateTodo(@Param('todoId') todoId: string, @Body() update: UpdateTodoDto, @Headers('Authorization') userId: string): Promise<string> {
    return this.todoService.updateTodo(todoId, update, userId);
  }
  
  @Put('/:todoId/category')
  updateTodoCategory(@Body() category: TodoCategoryDto,
                     @Headers('Authorization') userId: string,
                     @Param('todoId') todoId: string): Promise<string> {
    return this.todoService.updateTodoCategory(todoId, category.category, userId);
  }

  @Delete('/:todoId')
  deleteTodo(@Param('todoId') id: string, @Headers('Authorization') userId: string): Promise<string> {
    return this.todoService.removeTodo(id, userId)
  }
}
