import {Table, Column, Model, DataType, HasMany, CreatedAt, UpdatedAt, DeletedAt, IsEmail} from 'sequelize-typescript';
import {Device} from './device.model';
import {Todo} from './todo.model';

@Table({tableName: 'users'})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @IsEmail
  @Column({
    unique: true,
  })
  email: string;

  @Column({allowNull: false})
  displayName: string;

  @Column({
    allowNull: true,
    validate: {
      isUrl: true
    }
  })
  photoUrl: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @HasMany(() => Device)
  devices: Device[];

  @HasMany(() => Todo)
  todos: Todo[];
}