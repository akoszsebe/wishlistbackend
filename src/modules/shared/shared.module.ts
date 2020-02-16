import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class SharedModule {}
