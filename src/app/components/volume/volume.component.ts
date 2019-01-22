import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VolumeModel } from '../../models/volume.model';
import { faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css'],
})
export class VolumeComponent {
  @Input()
  volume: VolumeModel;

  @Input()
  clickable = false;

  @Input()
  full = true;

  @Output()
  lock = new EventEmitter<{
    volumeId: number;
  }>();

  @Output()
  unlock = new EventEmitter<{
    volumeId: number;
    passphrase?: string;
    recoveryKey?: string;
  }>();

  faLock = faLock;
  faUnlock = faUnlock;

  onLock() {
    this.lock.emit({
      volumeId: this.volume.id,
    });
  }

  onUnlock(event) {
    this.unlock.emit(event);
  }
}
