import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, // 일자 자동으로 찍어줌
};

@Schema(options)
export class Cat extends Document {
  @Prop({ require: true, unique: true })
  @IsEmail() // class validator
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imageUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
