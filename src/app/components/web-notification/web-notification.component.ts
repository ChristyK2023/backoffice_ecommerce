import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebNotificationService } from '../../services/web-notification.service';
import { NotificationModel } from '../../models/notification-model';
import { generateId } from '../../helpers/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-web-notification',
  templateUrl: './web-notification.component.html',
  styleUrl: './web-notification.component.css'
})
export class WebNotificationComponent implements OnInit, OnDestroy {

  notifications: Array<NotificationModel> = []
  subscribe$ = new Subscription();

  constructor (private notificationService: WebNotificationService) {

  }

  ngOnInit() {
    this.subscribe$ = this.notificationService.notification$.subscribe({
      next: (notification: NotificationModel) => {
        if (notification?.message) {
          notification._id = generateId()
          this.notifications.push(notification)
          console.log(this.notifications);

          // On ajoute un son a nos notifications
          const audio = document.createElement("audio")
          audio.src = "/assets/audios/success.wav"
          audio.play

          //src\assets\audios\success.wav

          const timeout: any = notification.timeout
          setTimeout(()=>{
            this.notifications = this.notifications.filter((notif: NotificationModel) => notif._id !== notification._id)
            },timeout
          )
        }
        }

    })
  }

  closeNotif(id: String) {
    this.notifications = this.notifications.filter((notif: NotificationModel) => notif._id !== id)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe$.unsubscribe()
  }

}
