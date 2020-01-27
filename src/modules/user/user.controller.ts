import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUser} from "./dto/create-user.dto";
import {User} from "../database/models/user.model";


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUser): Promise<User> {
    return this.userService.createUser(user);
  }

  @Delete()
  deleteUser(@Param() userId: number): Promise<string> {
    return this.userService.removeUser(userId);
  }
}
