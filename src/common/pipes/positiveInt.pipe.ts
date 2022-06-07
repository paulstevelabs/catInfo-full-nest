import {
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0 || isNaN(value)) {
      throw new HttpException(
        'value must be bigger than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
