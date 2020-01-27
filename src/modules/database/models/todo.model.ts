import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany, BelongsTo
} from 'sequelize-typescript';
import {User} from './user.model';

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

  @BelongsTo(() => User)
  owner: User;

  @BelongsToMany(() => User, 'id')
  users: User[];
}