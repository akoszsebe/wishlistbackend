import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  IsEmail,
  BelongsToMany, ForeignKey, PrimaryKey
} from 'sequelize-typescript';
import {Device} from './device.model';
import {Todo} from './todo.model';
import {User} from "./user.model";
import {userTodoRoles} from "../static/todo-roles.static";

@Table({tableName: 'usertodos'})
export class UserTodo extends Model<UserTodo> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId: number;

  @ForeignKey(() => Todo)
  @PrimaryKey
  @Column
  todoId: number;

  @Column({
    type: DataType.ENUM,
    values: userTodoRoles,
    defaultValue: userTodoRoles[0]
  })
  type: string;
}