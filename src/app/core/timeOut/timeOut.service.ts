import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
import { SessionObject } from '../../pages/shared/session-object';

import { Subject } from 'rxjs/Subject';


@Injectable()

export class TimeOutService {

      CHECKINTERVAL = 1000 * 60 * 1; // ms
      TIMEOUT_LIMIT = 30 * 60;  // in sec  30mins

      // CHECKINTERVAL = 1000 * 1 * 1; // ms
      // TIMEOUT_LIMIT = 10 * 1;  // in sec  30mins
      myInterval: Observable<any> = Observable.interval(this.CHECKINTERVAL);
      SubMyInterval: Subscription;
      LogOutAtTimeOut: Subject<any> = new Subject<any>();
      constructor(
      ) { }

      clearSession() {
            SessionObject.removeSessionObject();
      }

      silentLogOut() {
            this.clearSession();
      }

      autoLogout(): void {
            this.LogOutAtTimeOut.next(this.SubMyInterval);
      }

      setFirstTimeOut() {
            return new Promise((resolve, reject) => {
                  const dateTime = Date.now();
                  localStorage.setItem('TIMEOUT', dateTime.toString());
                  resolve();
            });
      }

      getTimeOutDateTime(): number {
            const dateTime = parseInt(localStorage.getItem('TIMEOUT'), 10);
            console.log('dateTime', dateTime);
            return isNaN(dateTime) ? 0 : dateTime
      }

      setNewTimeOut(): Promise<any> {
            return new Promise((resolve, reject) => {
                  const dateTime = Date.now();
                  localStorage.setItem('TIMEOUT', dateTime.toString());
                  resolve();
            });
      }



      isTimeOutSilent(): Promise<boolean> {
            // console.log('Inside isTimeOut isSilentLogout')
            return new Promise((resolve, reject) => {
                  this.isTimeOut()
                        .then(() => {
                              resolve(true);
                              this.silentLogOut();
                        })
                        .catch(() => {
                              reject(false);
                        })
            });
      }

      isTimeOut(): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  const currentTime = Date.now();
                  console.log('currentTime', currentTime);
                  const dateTimeDiff = (currentTime - this.getTimeOutDateTime()) / 1000;
                  console.log('dateTimeDiff', dateTimeDiff)
                  if (dateTimeDiff > this.TIMEOUT_LIMIT) {
                        console.log('Logging out');
                        this.clearCheckTimeOutSubcription();
                        localStorage.removeItem('TIMEOUT');
                        resolve(true)
                  }
                  reject(false);
            })
      }

      setCheckTimeOut() {
            this.CheckTimeOutSubisClosed()
                  .then(() => {
                        this.SubMyInterval = this.myInterval
                              .subscribe(() => {
                                    this.isTimeOut()
                                          .then(() => {
                                                this.autoLogout();
                                          })
                                          .catch(() => { });
                              });
                  })
                  .catch(() => {
                        console.log('catchOut catch');
                  })
      }

      CheckTimeOutSubisClosed() {
            return new Promise((resolve, reject) => {
                  if (this.SubMyInterval) {
                        if (this.SubMyInterval.closed) {
                              resolve();
                        }
                  } else {
                        resolve();
                  }
                  reject();
            })
      }

      clearCheckTimeOutSubcription() {
            // console.log('sub', this.SubMyInterval)
            if (this.SubMyInterval) {
                  // console.log('sub IN')
                  this.SubMyInterval.unsubscribe();
            }
      }




}
