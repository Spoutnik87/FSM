import { SendSuccessMessage, SendErrorMessage } from './../actions/messages.action';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { LOAD_ALERTS, LoadAlertsSuccess, LoadAlertsFail } from '../actions/alerts.action';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { AlertsService } from '../../services';
import { of } from 'rxjs';

@Injectable()
export class AlertsEffects {
  constructor(private action$: Actions, private alertsService: AlertsService) {}

  @Effect()
  loadAlerts$ = this.action$.pipe(
    ofType(LOAD_ALERTS),
    switchMap(() => {
      return this.alertsService.getAlerts().pipe(
        mergeMap(alerts => [new LoadAlertsSuccess(alerts), new SendSuccessMessage('Les alertes ont été chargées.')]),
        catchError(error => of(new LoadAlertsFail(error), new SendErrorMessage('Echec lors du chargement des alertes')))
      );
    })
  );
}
