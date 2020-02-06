import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

// function for if alertify msg is confirmed
// okCallback for if user confirms 'ok' rather than cancel
  confirm(message: string, okCallback: () => any) {
    alertify.comfirm(message, (e: any) => {
      if (e) {
        okCallback();
        // else do nothing if no 'ok' clicked
      } else { }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

}
