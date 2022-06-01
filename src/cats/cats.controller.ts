import { RunningTimeInterceptor } from './../common/interceptors/runningTime.interceptor';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(RunningTimeInterceptor, SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCat() {
    throw new HttpException(
      { errorCode: 1001, message: 'myError' },
      HttpStatus.FORBIDDEN,
    );

    return 'all cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    console.log(typeof param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'patch catF';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }

  @Post('upload/cats')
  uploadCatImage() {
    return 'upload image';
  }
}
