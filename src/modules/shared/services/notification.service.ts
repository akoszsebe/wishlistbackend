import {Inject, Injectable} from '@nestjs/common';
import {Device} from "../../database/models/device.model";
import admin, {ServiceAccount} from 'firebase-admin';
import serviceAccount from '../../../privatekey';

@Injectable()
export class NotificationService {

  constructor(@Inject('DEVICES_REPOSITORY') private readonly deviceRepository: typeof Device) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount.config as ServiceAccount),
      databaseURL: "https://wishlist-8a95b.firebaseio.com"
    });
  }

  async sendToAll(title: string, body: any): Promise<boolean> {
    const devices = await this.deviceRepository.findAll();
    if (devices && devices.length) {
      return NotificationService.sendNotification(devices.map(device => device.token), title, body);
    }
    return true;
  }

  async sendToUsers(users: Array<string>, title: any, body: any): Promise<boolean> {
    const devices = await this.deviceRepository.findAll({where: {}});
    if (devices && devices.length) {
      return NotificationService.sendNotification(devices.map(device => device.token), title, body);
    }
    return true;
  }

  private static async sendNotification(deviceIds: Array<string>, title: string, body: any): Promise<boolean> {
    const payload = {
      notification: {
        title: title,
        body: body,
        click_action: 'FLUTTER_NOTIFICATION_CLICK'
      },
      data: {
        title: title,
        body: body,
        click_action: 'FLUTTER_NOTIFICATION_CLICK'
      }
    };
    const options = {
      priority: "normal",
      timeToLive: 60 * 60
    };
    try {
      await admin.messaging().sendToDevice(deviceIds, payload, options);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
