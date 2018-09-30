import { IFreenasState } from "./store/reducers/index";
import { Store, select } from "@ngrx/store";
import { ipcRenderer, ipcMain } from "electron";
import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { LockVolume, getVolume, UnlockVolume } from "./store";
import { take, filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "FSM";

  @ViewChild("unlockVolumeModal")
  unlockVolumeModal;

  constructor(private zone: NgZone, private store: Store<IFreenasState>) {}

  ngOnInit() {
    ipcRenderer.on("lock-volume", (event, args) => {
      this.store
        .pipe(
          select(getVolume(args.volumeId)),
          take(1),
          filter(volume => volume != null)
        )
        .subscribe(volume => {
          if (!volume.locking && volume.is_decrypted) {
            ipcRenderer.send("focus");
            this.store.dispatch(new LockVolume(args.volumeId));
          }
        });
    });

    ipcRenderer.on("unlock-volume", (event, args) => {
      this.store
        .pipe(
          select(getVolume(args.volumeId)),
          take(1),
          filter(volume => volume != null)
        )
        .subscribe(volume => {
          if (!volume.unlocking && !volume.is_decrypted) {
            ipcRenderer.send("focus");
            this.zone.run(() => {
              this.unlockVolumeModal.volume = volume;
              this.unlockVolumeModal.show();
            });
          }
        });
    });
  }

  onUnlockVolume(event) {
    this.store.dispatch(
      new UnlockVolume(event.volumeId, event.passphrase, event.recoveryKey)
    );
  }
}
