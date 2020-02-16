import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany
} from 'sequelize-typescript';
import {User} from './user.model';
import {UserTodo} from "./user-todo.model";

@Table({tableName: 'users'})
export class Todo extends Model<Todo> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    validate: {
      len: [1, 160]
    }
  })
  title: string;

  @Column({
    allowNull: false,
    type: DataType.SMALLINT
  })
  category: number;

  @Column({
    defaultValue: false
  })
  archived: false;

  @Column({allowNull: false, defaultValue: ''})
  content: string;

  @CreatedAt
  @Column({field: 'created_at'})
  createdAt: Date;

  @UpdatedAt
  @Column({field: 'updated_at'})
  updatedAt: Date;

  @DeletedAt
  @Column({field: 'deleted_at'})
  deletedAt: Date;

  @Column({allowNull: false, type: DataType.UUID})
  ownerId: string;

  @BelongsToMany(() => User, () => UserTodo)
  users: User[];
}