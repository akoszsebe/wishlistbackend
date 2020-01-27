import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsUrl} from 'class-validator';

export class CreateUser {


  @ApiProperty({
    required: true,
    type: String,
    
  })
  @IsEmail()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty()
  @IsUrl()
  photoUrl: string;

}