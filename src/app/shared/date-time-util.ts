import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeUtil {

  static formatDateTimeToString(date: Date): string {
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

}
