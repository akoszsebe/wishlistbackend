import {HttpException, HttpStatus, Inject, Injectable, NestMiddleware} from "@nestjs/common";
import {User} from "../modules/database/models/user.model";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(@Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User) {
  }
  use(req: Request, res: Response, next: Function) {
    console.log('Request...', req.url);
    if (req.url.endsWith('/user') && req.method === 'POST') {
      next();
    } else {
      const authorization = req.headers.get('Authorization');
      if (!authorization) {
        return next(new HttpException('Missing or invalid authorization in the header', HttpStatus.UNAUTHORIZED));
      }
      const user = this.usersRepository.findByPk(authorization);
      if (!user) {
        return next(new HttpException('Missing or invalid authorization in the header', HttpStatus.UNAUTHORIZED));
      }
      req.headers["user"] = user;
      next();
    }
  }
}
