import { AlertModel } from "../../models/alert.model";
import {
  AlertsAction,
  LOAD_ALERTS_SUCCESS,
  LOAD_ALERTS,
  LOAD_ALERTS_FAIL
} from "../actions/alerts.action";

export interface IAlertsReducerState {
  alerts: AlertModel[];
  loading: boolean;
  loaded: boolean;
}

const initialState: IAlertsReducerState = {
  alerts: [],
  loading: false,
  loaded: false
};

export function alertsReducer(
  state = initialState,
  action: AlertsAction
): IAlertsReducerState {
  switch (action.type) {
    case LOAD_ALERTS:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_ALERTS_SUCCESS:
      return {
        alerts: action.payload,
        loading: false,
        loaded: true
      };
    case LOAD_ALERTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
}

export const getAlertsLoading = (state: IAlertsReducerState) => state.loading;
export const getAlertsLoaded = (state: IAlertsReducerState) => state.loaded;
export const getAlerts = (state: IAlertsReducerState) => state.alerts;
