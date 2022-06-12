import { CommentSchema, Comments } from './../comments/comments.schema';
import { AuthModule } from './../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentSchema },
    ]),
    forwardRef(() => AuthModule),
    MulterModule.register({ dest: './upload' }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
