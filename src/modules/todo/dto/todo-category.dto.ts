import {ApiProperty} from "@nestjs/swagger";

export class TodoCategoryDto {


  @ApiProperty({
    required: true,
    type: String,
  })
  category: number;
}