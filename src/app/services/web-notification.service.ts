import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationModel } from '../models/notification-model';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {

  notif = new NotificationModel()
  notification$ = new BehaviorSubject<NotificationModel>(this.notif)

  constructor() { }

  emitNotification(notification: any) {
    const notif = new NotificationModel()
    notif.message = notification?.message ? notification?.message : notif.message
    notif.status = notification?.status ? notification?.status : notif.status
    notif.title = notification?.title ? notification?.title : notif.title
    notif.timeout = notification?.timeout ? notification?.timeout : notif.timeout
    this.notification$.next(notification)
  }

}
