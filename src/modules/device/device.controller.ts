import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import { DeviceService } from './device.service';
import {CreateDeviceDto} from "./dto/create-device.dto";


@Controller('/devices')
export class DeviceController {
  constructor(private readonly notificationService: DeviceService) {}

  @Post()
  register(@Body() device: CreateDeviceDto): Promise<string> {
    return this.notificationService.insertDevice(device);
  }

  @Delete()
  unregister(@Param() token: string): Promise<string> {
    return this.notificationService.removeDevice(token);
  }
}
