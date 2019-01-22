import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { VolumesService } from '../../services';
import {
  LOAD_VOLUMES,
  LoadVolumesSuccess,
  LoadVolumesFail,
  LOCK_VOLUME,
  LockVolume,
  LockVolumeSuccess,
  LockVolumeFail,
  UNLOCK_VOLUME,
  UnlockVolume,
  UnlockVolumeSuccess,
  UnlockVolumeFail,
} from '../actions/volumes.action';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SendSuccessMessage, SendErrorMessage } from '../actions/messages.action';

@Injectable()
export class VolumesEffects {
  constructor(private action$: Actions, private volumesService: VolumesService) {}

  @Effect()
  loadVolumes$ = this.action$.pipe(
    ofType(LOAD_VOLUMES),
    switchMap(() =>
      this.volumesService.getVolumes().pipe(
        map(volumes => new LoadVolumesSuccess(volumes)),
        catchError(error => of(new LoadVolumesFail(error)))
      )
    )
  );

  @Effect()
  lockVolume$ = this.action$.pipe(
    ofType(LOCK_VOLUME),
    switchMap((action: LockVolume) =>
      this.volumesService.lockVolume(action.payload).pipe(
        mergeMap(() => [new LockVolumeSuccess(action.payload), new SendSuccessMessage('Le volume a été verouillé.')]),
        catchError(error =>
          of(new LockVolumeFail(action.payload, error), new SendErrorMessage('Une erreur est survenue lors du verouillage du volume.'))
        )
      )
    )
  );

  @Effect()
  unlockVolume$ = this.action$.pipe(
    ofType(UNLOCK_VOLUME),
    switchMap((action: UnlockVolume) =>
      this.volumesService.unlockVolume(action.payload.volumeId, action.payload.passphrase, action.payload.recoveryKey).pipe(
        map(() => new UnlockVolumeSuccess(action.payload.volumeId) && new SendSuccessMessage('Le volume a été déverouillé.')),
        catchError(error =>
          of(
            new UnlockVolumeFail(action.payload.volumeId, error) &&
              new SendErrorMessage('Une erreur est survenue lors du déverouillage du volume.')
          )
        )
      )
    )
  );
}
