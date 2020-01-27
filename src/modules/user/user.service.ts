import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User} from '../database/models/user.model';
import {CreateUser} from "./dto/create-user.dto";

@Injectable()
export class UserService {

  constructor(@Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User) {}

  async createUser(user: CreateUser): Promise<User> {
    const isExist = await this.usersRepository.findOne({where: {email: user.user_id}});
    if (isExist) {
      return isExist;
    }
    return this.usersRepository.create({
      email: user.user_id,
      displayName: user.displayName,
      photoUrl: user.photoUrl
    });
  }

  async removeUser(userId): Promise<string> {
    const isExist = await this.usersRepository.findByPk(userId);
    if (isExist) {
      await this.usersRepository.destroy({where: {id: userId}});
      return 'Removed';
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
