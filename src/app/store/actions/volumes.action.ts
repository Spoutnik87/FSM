import { Action } from "@ngrx/store";
import { VolumeModel } from "../../models/volume.model";

export const LOAD_VOLUMES = "LOAD_VOLUMES";
export const LOAD_VOLUMES_SUCCESS = "LOAD_VOLUMES_SUCCESS";
export const LOAD_VOLUMES_FAIL = "LOAD_VOLUMES_FAIL";
export const LOCK_VOLUME = "LOCK_VOLUME";
export const LOCK_VOLUME_SUCCESS = "LOCK_VOLUME_SUCCESS";
export const LOCK_VOLUME_FAIL = "LOCK_VOLUME_FAIL";
export const UNLOCK_VOLUME = "UNLOCK_VOLUME";
export const UNLOCK_VOLUME_SUCCESS = "UNLOCK_VOLUME_SUCCESS";
export const UNLOCK_VOLUME_FAIL = "UNLOCK_VOLUME_FAIL";

export class LoadVolumes implements Action {
  readonly type = LOAD_VOLUMES;
}

export class LoadVolumesSuccess implements Action {
  readonly type = LOAD_VOLUMES_SUCCESS;
  payload: VolumeModel[];

  constructor(volumes: VolumeModel[]) {
    this.payload = volumes;
  }
}

export class LoadVolumesFail implements Action {
  readonly type = LOAD_VOLUMES_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export class LockVolume implements Action {
  readonly type = LOCK_VOLUME;
  payload: number;

  constructor(volumeId: number) {
    this.payload = volumeId;
  }
}

export class LockVolumeSuccess implements Action {
  readonly type = LOCK_VOLUME_SUCCESS;
  payload: number;

  constructor(volumeId: number) {
    this.payload = volumeId;
  }
}

export class LockVolumeFail implements Action {
  readonly type = LOCK_VOLUME_FAIL;
  payload: {
    volumeId: number;
    error: any;
  };

  constructor(volumeId: number, error: any) {
    this.payload = {
      volumeId,
      error
    };
  }
}

export class UnlockVolume implements Action {
  readonly type = UNLOCK_VOLUME;
  payload: {
    volumeId: number;
    passphrase: string;
    recoveryKey?: string;
  };

  constructor(volumeId: number, passphrase?: string, recoveryKey?: string) {
    this.payload = {
      volumeId,
      passphrase,
      recoveryKey
    };
  }
}

export class UnlockVolumeSuccess implements Action {
  readonly type = UNLOCK_VOLUME_SUCCESS;
  payload: number;

  constructor(volumeId: number) {
    this.payload = volumeId;
  }
}

export class UnlockVolumeFail implements Action {
  readonly type = UNLOCK_VOLUME_FAIL;
  payload: {
    volumeId: number;
    error: any;
  };

  constructor(volumeId: number, error: any) {
    this.payload = {
      volumeId,
      error
    };
  }
}

export type VolumesAction =
  | LoadVolumes
  | LoadVolumesSuccess
  | LoadVolumesFail
  | LockVolume
  | LockVolumeSuccess
  | LockVolumeFail
  | UnlockVolume
  | UnlockVolumeSuccess
  | UnlockVolumeFail;
