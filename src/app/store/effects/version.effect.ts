import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { LOAD_VERSION, LoadVersionSuccess, LoadVersionFail } from '../actions/version.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { VersionService } from '../../services';
import { of } from 'rxjs';

@Injectable()
export class VersionEffects {
  constructor(private action$: Actions, private versionService: VersionService) {}

  @Effect()
  loadVersion$ = this.action$.pipe(
    ofType(LOAD_VERSION),
    switchMap(() => {
      return this.versionService.getVersion().pipe(
        map(version => new LoadVersionSuccess(version)),
        catchError(error => of(new LoadVersionFail(error)))
      );
    })
  );
}
