import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(
    //   `IP -> ${req.ip} / ORIGINAL_URL -> ${req.originalUrl}`,
    //   'title',
    // );

    res.on('finish', () => {
      this.logger.log(
        `[${req.method}] - ${req.originalUrl} - ${req.ip} ---> STATUS_CODE - ${res.statusCode}`,
      );
    });
    next();
  }
}
