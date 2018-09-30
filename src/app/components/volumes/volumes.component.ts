import { Component, Input, Output, EventEmitter } from "@angular/core";
import { VolumeModel } from "../../models/volume.model";

@Component({
  selector: "app-volumes",
  templateUrl: "./volumes.component.html"
})
export class VolumesComponent {
  @Input()
  volumes: VolumeModel[];

  @Input()
  clickable = false;

  @Input()
  full = true;

  @Output()
  lockVolume = new EventEmitter();

  @Output()
  unlockVolume = new EventEmitter();

  @Output()
  clickVolume = new EventEmitter<VolumeModel>();

  onLockVolume(event) {
    this.lockVolume.emit(event);
  }

  onUnlockVolume(event) {
    this.unlockVolume.emit(event);
  }

  onClickVolume(event) {
    this.clickVolume.emit(event);
  }
}
