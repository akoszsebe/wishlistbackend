import {Inject, Injectable} from '@nestjs/common';
import {Device} from "../../database/models/device.model";

@Injectable()
export class NotificationService {

  constructor(@Inject('DEVICES_REPOSITORY') private readonly deviceRepository: typeof Device) {
  }


  sendNotification() {
    const devices = this.deviceRepository.findAll()
  }
}
