import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import {User} from './user.model';

@Table({tableName: 'devices'})
export class Device extends Model<Device> {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @Column({
    allowNull: false,
    unique: true
  })
  token: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  userId: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @BelongsTo(() => User)
  user: User;
}