import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import {DatabaseModule} from '../database/database.module';
import {SharedModule} from "../shared/shared.module";

@Module({
  imports: [DatabaseModule, SharedModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
