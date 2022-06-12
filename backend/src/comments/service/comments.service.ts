import { CatsRepository } from './../../cats/cats.repository';
import { CommentsCreateDto } from './../dtos/comments.create.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from '../comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getComments() {
    try {
      return await this.commentsModel.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createComment(catId: string, commentData: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        catId,
      );

      const { contents, author } = commentData;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);

      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });

      return await newComment.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async increaseLike(catId: string) {
    try {
      const comment = await this.commentsModel.findById(catId);
      console.log(comment);
      comment.likeCount += 1;

      return await comment.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
