import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./modules/user/user.module";
import {DeviceModule} from "./modules/device/device.module";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {TodoModule} from "./modules/todo/todo.module";

@Module({
  imports: [UserModule, DeviceModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware);
  }
}
