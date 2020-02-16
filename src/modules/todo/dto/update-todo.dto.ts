import {ApiProperty} from "@nestjs/swagger";

export class UpdateTodoDto {


  @ApiProperty({
    required: true,
    type: String,
  })
  title: string;

  @ApiProperty({required: true})
  content: string;

  @ApiProperty({required: true})
  category: number;

  @ApiProperty({required: true})
  archived: boolean;
}