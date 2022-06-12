import { CatsModule } from './../cats/cats.module';
import { Comments, CommentSchema } from './comments.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { CommentsService } from './service/comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comments.name, schema: CommentSchema }]),
    CatsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
