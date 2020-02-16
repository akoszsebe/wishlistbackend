import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";


@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<any> {
    return this.userService.createUser(user);
  }

  @Delete()
  deleteUser(@Param() userId: string): Promise<string> {
    return this.userService.removeUser(userId);
  }
}
