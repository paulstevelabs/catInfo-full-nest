import { Cat } from './cats.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('이메일이 이미 존재합니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    // return {
    //   id: cat.id,
    //   email: cat.email,
    //   name: cat.name,
    // };
    return cat.readOnlyData;
  }

  async uploadImage(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImage(
      cat.id,
      fileName,
    );

    console.log(newCat);

    return newCat;
  }

  async getCats() {
    return (await this.catsRepository.findAll()).map((cat) => cat.readOnlyData);
  }
}
