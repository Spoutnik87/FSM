import { VersionModel } from '../../models/version.model';
import { VersionAction, LOAD_VERSION, LOAD_VERSION_SUCCESS, LOAD_VERSION_FAIL } from '../actions/version.action';

export interface IVersionReducerState {
  version: VersionModel;
  loading: boolean;
  loaded: boolean;
}

const initialState: IVersionReducerState = {
  version: {
    fullversion: '',
    name: '',
    version: '',
  },
  loading: false,
  loaded: false,
};

export function versionReducer(state = initialState, action: VersionAction): IVersionReducerState {
  switch (action.type) {
    case LOAD_VERSION:
      return {
        ...state,
        loading: true,
      };
    case LOAD_VERSION_SUCCESS:
      return {
        version: action.payload,
        loading: false,
        loaded: true,
      };
    case LOAD_VERSION_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export const getVersionLoading = (state: IVersionReducerState) => state.loading;
export const getVersionLoaded = (state: IVersionReducerState) => state.loaded;
export const getVersion = (state: IVersionReducerState) => state.version;
