import { Device } from '../models/device.model';

export const devicesProviders = [
  {
    provide: 'DEVICES_REPOSITORY',
    useValue: Device,
  },
];