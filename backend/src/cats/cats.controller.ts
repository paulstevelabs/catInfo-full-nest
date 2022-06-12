import { Cat } from './cats.schema';
import { CurrentUser } from './../common/decorators/user.decorator';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { RunningTimeInterceptor } from '../common/interceptors/runningTime.interceptor';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors(RunningTimeInterceptor, SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData; // req.uest
  }

  @ApiOperation({ summary: '고양이 전부 가져오기' })
  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCat() {
    throw new HttpException(
      { errorCode: 1001, message: 'myError' },
      HttpStatus.FORBIDDEN,
    );

    return 'all cat';
  }

  @ApiOperation({ summary: '특정 고양이 가져오기' })
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    console.log(typeof param);
    return 'one cat';
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
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

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImage() {
    return 'upload image';
  }
}
