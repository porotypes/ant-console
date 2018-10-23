import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  writeStorage(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }

  hasStorage(key: string): boolean {
    return !!window.localStorage.getItem(key);
  }

  readStorage(key: string): string {
    return window.localStorage.getItem(key);
  }

  removeStorage(key) {
    window.localStorage.removeItem(key);
  }
}
