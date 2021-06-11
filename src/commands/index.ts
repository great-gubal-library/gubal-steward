import { Ping } from './fun/Ping';
import { GetLocation } from './locations/GetLocation';
import { ICommand } from 'src/types/Commands';

export const COMMANDS: ICommand[] = [
  Ping,
  GetLocation
];
