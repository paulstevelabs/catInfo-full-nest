import { CommentSchema } from './../comments/comments.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types, Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    return await this.catModel.findById(catId).select('-password');
  }

  async existsByEmail(email: string): Promise<boolean> {
    return (await this.catModel.exists({ email })) ? true : false;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }

  async findByIdAndUpdateImage(catId: string, fileName: string) {
    const cat = await this.catModel.findById(catId);
    cat.imageUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);

    return newCat.readOnlyData;
  }

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentSchema);

    return await this.catModel.find().populate('comments', CommentsModel);
  }
}
