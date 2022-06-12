import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, // 일자 자동으로 찍어줌
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '고양이 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, require: true, ref: 'cats' })
  @IsString() // class validator
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({ default: 0, required: true })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상(게시글, 정보글)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, require: true, ref: 'cats' })
  @IsString() // class validator
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
