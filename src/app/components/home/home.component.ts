import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import {
  IFreenasState,
  getVolumes,
  LoadVolumes,
  LoadVersion,
  UnlockVolume,
  LockVolume,
  getVersionLoading,
  getVolumesLoading,
  getVersionLoaded,
  getVolumesLoaded,
} from './../../store';
import { VolumeModel } from './../../models/volume.model';
import { VersionModel } from './../../models/version.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  version$: Observable<VersionModel>;
  volumes$: Observable<VolumeModel[]>;
  versionLoading$: Observable<boolean>;
  volumesLoading$: Observable<boolean>;
  versionLoaded$: Observable<boolean>;
  volumesLoaded$: Observable<boolean>;

  constructor(private store: Store<IFreenasState>) {}

  ngOnInit() {
    this.version$ = this.store.select(fromStore.getVersion);
    this.volumes$ = this.store.select(getVolumes);
    this.versionLoading$ = this.store.select(getVersionLoading);
    this.volumesLoading$ = this.store.select(getVolumesLoading);
    this.versionLoaded$ = this.store.select(getVersionLoaded);
    this.volumesLoaded$ = this.store.select(getVolumesLoaded);
    this.store.dispatch(new LoadVersion());
    this.store.dispatch(new LoadVolumes());
  }

  onLockVolume(event) {
    this.store.dispatch(new LockVolume(event.volumeId));
  }

  onUnlockVolume(event) {
    this.store.dispatch(new UnlockVolume(event.volumeId, event.passphrase, event.recoveryKey));
  }
}
