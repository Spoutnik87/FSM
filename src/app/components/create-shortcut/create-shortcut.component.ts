import { ipcRenderer } from "electron";
import { ConfigService } from "./../../services/config.service";
import { Router } from "@angular/router";
import { VolumeModel } from "./../../models/volume.model";
import { Observable } from "rxjs";
import {
  IFreenasState,
  getEncryptedVolumes
} from "./../../store/reducers/index";
import { Store, select } from "@ngrx/store";
import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { ShortcutModel } from "../../models/shortcut.model";

@Component({
  selector: "app-create-shortcut",
  templateUrl: "./create-shortcut.component.html",
  styleUrls: ["./create-shortcut.component.css"]
})
export class CreateShortcutComponent implements OnInit, OnDestroy {
  encryptedVolumes$: Observable<VolumeModel[]>;

  shortcut: ShortcutModel = {
    shortcut: "",
    volumeId: -1,
    type: "lock"
  };

  constructor(
    private router: Router,
    private configService: ConfigService,
    private store: Store<IFreenasState>
  ) {}

  ngOnInit() {
    this.encryptedVolumes$ = this.store.pipe(select(getEncryptedVolumes));
    ipcRenderer.send("disable");
  }

  ngOnDestroy() {
    ipcRenderer.send("enable");
  }

  onSelectVolume(volume: VolumeModel) {
    this.shortcut.volumeId = volume.id;
  }

  onCancel() {
    this.router.navigateByUrl("/config");
  }

  onSubmit() {
    this.configService.addShortcut(this.shortcut);
    ipcRenderer.send("add-shortcut", this.shortcut);
    this.router.navigateByUrl("/config");
  }

  @HostListener("window:keydown", ["$event"])
  keyEvent(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key === "control" || key === "alt" || key === "shift") {
      return;
    }
    let shortcut = "";
    if (event.ctrlKey) {
      shortcut += "CommandOrControl+";
    }
    if (event.shiftKey) {
      shortcut += "Shift+";
    }
    if (event.altKey) {
      shortcut += "Alt+";
    }
    shortcut += event.key;
    this.shortcut.shortcut = shortcut;
  }
}
