import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {


  @ApiProperty({
    required: true,

  })
  user_id: string;

  @ApiProperty({required: true})
  displayName: string;

  @ApiProperty({required: true})
  photoUrl: string;

}