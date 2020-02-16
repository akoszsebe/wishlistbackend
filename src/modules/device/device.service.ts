import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CreateDeviceDto} from "./dto/create-device.dto";
import {Device} from "../database/models/device.model";

@Injectable()
export class DeviceService {

  constructor(@Inject('DEVICES_REPOSITORY') private readonly deviceRepository: typeof Device) {}

  async insertDevice(device: CreateDeviceDto): Promise<string> {
    const isExist = await this.deviceRepository.findOne({where: {token: device.token}});
    if (isExist) {
      return 'SAVED';
    }
    await this.deviceRepository.create({
      ...device
    });
    return 'SAVED';
  }

  async removeDevice(token): Promise<string> {
    const isExist = await this.deviceRepository.findOne({where: {token}});
    if (isExist) {
      await this.deviceRepository.destroy({where: {token}});
      return 'REMOVED';
    }
    throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
  }
}
