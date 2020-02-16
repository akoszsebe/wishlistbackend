import {ApiProperty} from "@nestjs/swagger";

export class CreateDeviceDto {


  @ApiProperty({
    required: true,
    type: String,
  })
  user_id: string;

  @ApiProperty({required: true, type: String})
  token: string;
}