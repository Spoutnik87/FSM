import { Action } from '@ngrx/store';
import { AlertModel } from '../../models/alert.model';

export const LOAD_ALERTS = 'LOAD_ALERTS';
export const LOAD_ALERTS_SUCCESS = 'LOAD_ALERTS_SUCCESS';
export const LOAD_ALERTS_FAIL = 'LOAD_ALERTS_FAIL';

export class LoadAlerts implements Action {
  readonly type = LOAD_ALERTS;
}

export class LoadAlertsSuccess implements Action {
  readonly type = LOAD_ALERTS_SUCCESS;
  payload: AlertModel[];

  constructor(alerts: AlertModel[]) {
    this.payload = alerts;
  }
}

export class LoadAlertsFail implements Action {
  readonly type = LOAD_ALERTS_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export type AlertsAction = LoadAlerts | LoadAlertsSuccess | LoadAlertsFail;
