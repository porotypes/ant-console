import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeUtil {

  static formatDateTimeToString(date: Date): string {
    if (!date) {
      return null;
    }
    const dateTime = new Date(date);
    const month = `${(dateTime.getMonth() + 1).toString().padStart(2, '0')}`;
    const day = `${dateTime.getDate().toString().padStart(2, '0')}`;
    const dateString = `${dateTime.getFullYear()}-${month}-${day}`;
    const hour = `${dateTime.getHours().toString().padStart(2, '0')}`;
    const minutes = `${dateTime.getMinutes().toString().padStart(2, '0')}`;
    const seconds = `${dateTime.getSeconds().toString().padStart(2, '0')}`;
    const timeString = `${hour}:${minutes}:${seconds}`;
    return `${dateString} ${timeString}`;
  }

  static getStartTimeString(date: Date): Date {
    if (!date) {
      return null;
    }
    const dateTime = new Date(date);
    const month = `${(dateTime.getMonth() + 1).toString().padStart(2, '0')}`;
    const day = `${dateTime.getDate().toString().padStart(2, '0')}`;
    const dateString = `${dateTime.getFullYear()}-${month}-${day}`;
    return new Date(`${dateString} 00:00:00`);
  }

  static getEndTimeString(date: Date): Date {
    if (!date) {
      return null;
    }
    const dateTime = new Date(date);
    const month = `${(dateTime.getMonth() + 1).toString().padStart(2, '0')}`;
    const day = `${dateTime.getDate().toString().padStart(2, '0')}`;
    const dateString = `${dateTime.getFullYear()}-${month}-${day}`;
    return new Date(`${dateString} 23:59:59`);
  }

}
