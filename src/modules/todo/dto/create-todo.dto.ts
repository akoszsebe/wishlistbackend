import {ApiProperty} from "@nestjs/swagger";

export class CreateTodoDto {


  @ApiProperty({
    required: true,
    type: String,
  })
  title: string;

  @ApiProperty({required: true})
  content: string;

  @ApiProperty({required: true})
  category: number;
}