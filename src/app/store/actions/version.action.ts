import { Action } from "@ngrx/store";
import { VersionModel } from "../../models/version.model";

export const LOAD_VERSION = "LOAD_VERSION";
export const LOAD_VERSION_SUCCESS = "LOAD_VERSION_SUCCESS";
export const LOAD_VERSION_FAIL = "LOAD_VERSION_FAIL";

export class LoadVersion implements Action {
  readonly type = LOAD_VERSION;
}

export class LoadVersionSuccess implements Action {
  readonly type = LOAD_VERSION_SUCCESS;
  payload: VersionModel;

  constructor(version: VersionModel) {
    this.payload = version;
  }
}

export class LoadVersionFail implements Action {
  readonly type = LOAD_VERSION_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export type VersionAction = LoadVersion | LoadVersionSuccess | LoadVersionFail;
