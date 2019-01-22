import { VolumeModel } from '../../models/volume.model';
import {
  VolumesAction,
  LOAD_VOLUMES,
  LOAD_VOLUMES_SUCCESS,
  LOAD_VOLUMES_FAIL,
  LOCK_VOLUME,
  LOCK_VOLUME_SUCCESS,
  LOCK_VOLUME_FAIL,
  UNLOCK_VOLUME,
  UNLOCK_VOLUME_SUCCESS,
  UNLOCK_VOLUME_FAIL,
} from '../actions/volumes.action';

export interface IVolumesReducerState {
  volumes: VolumeModel[];
  loading: boolean;
  loaded: boolean;
}

const initialState: IVolumesReducerState = {
  volumes: [],
  loading: false,
  loaded: false,
};

export function volumeReducer(state = initialState, action: VolumesAction): IVolumesReducerState {
  switch (action.type) {
    case LOAD_VOLUMES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_VOLUMES_SUCCESS:
      return {
        volumes: action.payload.map(volume => ({
          ...volume,
          locking: false,
          unlocking: false,
        })),
        loading: false,
        loaded: true,
      };
    case LOAD_VOLUMES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case LOCK_VOLUME:
      return {
        ...state,
        volumes: state.volumes.map(volume => {
          if (volume.id !== action.payload) {
            return volume;
          }
          return {
            ...volume,
            locking: true,
          };
        }),
      };
    case LOCK_VOLUME_SUCCESS:
      return {
        ...state,
        volumes: state.volumes.map(volume => {
          if (volume.id !== action.payload) {
            return volume;
          }
          return {
            ...volume,
            locking: false,
            is_decrypted: false,
          };
        }),
      };
    case LOCK_VOLUME_FAIL:
      return {
        ...state,
        volumes: state.volumes.map(volume => {
          if (volume.id !== action.payload.volumeId) {
            return volume;
          }
          return {
            ...volume,
            locking: false,
          };
        }),
      };
    case UNLOCK_VOLUME:
      return {
        ...state,
        volumes: state.volumes.map(volume => {
          if (volume.id !== action.payload.volumeId) {
            return volume;
          }
          return {
            ...volume,
            unlocking: true,
          };
        }),
      };
    case UNLOCK_VOLUME_SUCCESS:
      return {
        ...state,
        volumes: state.volumes.map(volume => {
          if (volume.id !== action.payload) {
            return volume;
          }
          return {
            ...volume,
            unlocking: false,
            is_decrypted: true,
          };
        }),
      };
    case UNLOCK_VOLUME_FAIL:
      return {
        ...state,
        volumes: state.volumes.map(volume => {
          if (volume.id !== action.payload.volumeId) {
            return volume;
          }
          return {
            ...volume,
            unlocking: false,
          };
        }),
      };
    default:
      return state;
  }
}

export const getVolumesLoading = (state: IVolumesReducerState) => state.loading;
export const getVolumesLoaded = (state: IVolumesReducerState) => state.loaded;
export const getVolumes = (state: IVolumesReducerState) => state.volumes;
export const getEncryptedVolumes = (state: VolumeModel[]) => state.filter(volume => volume.vol_encrypt !== 0);
export const getVolume = (volumeId: number) => (state: VolumeModel[]) => {
  for (const volume of state) {
    if (volume.id === volumeId) {
      return volume;
    }
  }
  return undefined;
};
