import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public permission: Permission;
  constructor() {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }
  public isSupported(): boolean {
    return 'Notification' in window;
  }
  requestPermission(): void {
    let self = this;
    if ('Notification' in window) {
      Notification.requestPermission(function (status) {
        return self.permission = status;
      });
    }
  }
  create(title: string, options?: PushNotification): any {
    let self = this;
    return new Observable(function (obs) {
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');
        obs.complete();
      }
      if (self.permission !== 'granted') {
        console.log("The user hasn't granted you permission to send push notifications");
        obs.complete();
      }
      let _notify = new Notification(title, options);
      _notify.onshow = function (e) {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      setTimeout(_notify.close.bind(_notify),4000);
      _notify.onclick = function (e) {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onerror = function (e) {
        return obs.error({
          notification: _notify,
          event: e
        });
      };
      _notify.onclose = function () {
        return obs.complete();
      };
    });
  }
  generateNotification(source): void {
    let self = this;
    let title = "รอบการจัดส่ง: " + source.title;
    console.log(source);
      let options = {
        body: source.alertContent,
        icon: "../../assets/img/TRAVEL1.png"
      };
      let notify = self.create(title, options).subscribe();
    
  }
}
export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
    body ? : string;
    icon ? : string;
    tag ? : string;
    data ? : any;
    renotify ? : boolean;
    silent ? : boolean;
    sound ? : string;
    noscreen ? : boolean;
    sticky ? : boolean;
    dir ? : 'auto' | 'ltr' | 'rtl';
    lang ? : string;
    vibrate ? : number[];
}
