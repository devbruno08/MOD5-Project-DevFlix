import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Exception } from './IException';

export enum Exceptions {
  InvalidData,
  DatabaseExceptions,
  NotFound,
  UnauthorizedException,
}

export function HandleException({ message, exception }: Exception) {
  if (
    exception === Exceptions.InvalidData ||
    exception === Exceptions.NotFound
  ) {
    throw new BadRequestException(message ? message : 'Data is not valid');
  }
  if (exception === Exceptions.DatabaseExceptions) {
    throw new InternalServerErrorException('Error in database!');
  }
  if (exception === Exceptions.UnauthorizedException) {
    throw new UnauthorizedException(message ? message : 'Not authorized!');
  }
}
