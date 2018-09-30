import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";
import * as fromMessages from "./messages.reducer";
import * as fromAlerts from "./alerts.reducer";
import * as fromVersion from "./version.reducer";
import * as fromVolumes from "./volumes.reducer";

export interface IFreenasState {
  messagesReducer: fromMessages.IMessagesReducerState;
  versionReducer: fromVersion.IVersionReducerState;
  alertsReducer: fromAlerts.IAlertsReducerState;
  volumesReducer: fromVolumes.IVolumesReducerState;
}

export const reducers: ActionReducerMap<IFreenasState> = {
  messagesReducer: fromMessages.messagesReducer,
  versionReducer: fromVersion.versionReducer,
  alertsReducer: fromAlerts.alertsReducer,
  volumesReducer: fromVolumes.volumeReducer
};

export const getFreenasState = createFeatureSelector<IFreenasState>("freenas");

export const getMessagesState = createSelector(
  getFreenasState,
  (state: IFreenasState) => state.messagesReducer
);

export const getMessages = createSelector(
  getMessagesState,
  fromMessages.getMessages
);

export const getSuccessMessages = createSelector(
  fromMessages.getMessages,
  fromMessages.getSuccessMessages
);

export const getErrorMessages = createSelector(
  fromMessages.getMessages,
  fromMessages.getErrorMessages
);

export const getInfoMessages = createSelector(
  fromMessages.getMessages,
  fromMessages.getInfoMessages
);

export const getVersionState = createSelector(
  getFreenasState,
  (state: IFreenasState) => state.versionReducer
);

export const getAlertsState = createSelector(
  getFreenasState,
  (state: IFreenasState) => state.alertsReducer
);

export const getVolumesState = createSelector(
  getFreenasState,
  (state: IFreenasState) => state.volumesReducer
);

export const getVersion = createSelector(
  getVersionState,
  fromVersion.getVersion
);
export const getVersionLoading = createSelector(
  getVersionState,
  fromVersion.getVersionLoading
);
export const getVersionLoaded = createSelector(
  getVersionState,
  fromVersion.getVersionLoaded
);

export const getAlerts = createSelector(getAlertsState, fromAlerts.getAlerts);
export const getAlertsLoading = createSelector(
  getAlertsState,
  fromAlerts.getAlertsLoading
);
export const getAlertsLoaded = createSelector(
  getAlertsState,
  fromAlerts.getAlertsLoaded
);

export const getVolumes = createSelector(
  getVolumesState,
  fromVolumes.getVolumes
);

export const getEncryptedVolumes = createSelector(
  getVolumes,
  fromVolumes.getEncryptedVolumes
);

export const getVolumesLoading = createSelector(
  getVolumesState,
  fromVolumes.getVolumesLoading
);

export const getVolumesLoaded = createSelector(
  getVolumesState,
  fromVolumes.getVolumesLoaded
);

export const getVolume = (volumeId: number) =>
  createSelector(getVolumes, fromVolumes.getVolume(volumeId));
