import {Sequelize} from 'sequelize-typescript';
import {User} from '../models/user.model';
import {Device} from '../models/device.model';
import {Todo} from '../models/todo.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([User, Device, Todo]);
      await sequelize.sync({force: true});
      return sequelize;
    },
  },
];
