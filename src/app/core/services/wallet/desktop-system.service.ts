import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

export type DesktopAPI = { username: () => Promise<string> };

@Injectable({
  providedIn: 'root'
})
export class DesktopSystemService {
  private desktopAPI: DesktopAPI;

  constructor() {
    this.desktopAPI = window.marketplace2;

  }

  getSystemInfo(): Observable<string> {
    if (this.desktopAPI) {
      return this.getOS();
    } return of('');
  }

  private getOS(): Observable<string> {
    return new Observable<string>(subscriber => {
      this.desktopAPI.username().then(amount => subscriber.next(amount)).then(() => subscriber.complete());
    });
  }
}
