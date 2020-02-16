import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User} from '../database/models/user.model';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserService {

  constructor(@Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User) {}

  async createUser(user: CreateUserDto): Promise<{ id: string, displayName: string, photoUrl: string }> {
    const isExist = await this.usersRepository.findOne({where: {email: user.user_id}});
    if (isExist) {
      return isExist;
    }
    const createdUser = await this.usersRepository.create({
      email: user.user_id,
      displayName: user.displayName,
      photoUrl: user.photoUrl
    });

    return {
      id: createdUser.id,
      displayName: createdUser.displayName,
      photoUrl: createdUser.photoUrl
    };

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
