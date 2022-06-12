import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, // 일자 자동으로 찍어줌
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
    required: true,
  })
  @Prop({ require: true, unique: true })
  @IsEmail() // class validator
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '김고양',
    description: '이름',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'https://ssdf.test.com/usdf',
    description: '이미지 url',
    required: false,
  })
  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imageUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imageUrl,
  };
});
