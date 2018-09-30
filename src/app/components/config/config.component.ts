import { ConfigModel } from "./../../models/config.model";
import { ShortcutModel } from "./../../models/shortcut.model";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "../../services/config.service";
import { ipcRenderer } from "electron";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.css"]
})
export class ConfigComponent {
  config: ConfigModel;
  loading = false;
  alertSave = false;
  alertCheckConfig = false;
  alertInvalid = false;

  constructor(private router: Router, private configService: ConfigService) {
    this.config = configService.getConfig();
  }

  onSubmit() {
    this.loading = true;
    this.alertSave = true;
    this.configService.setUrl(this.config.url, false);
    this.configService.setSetup(true);
    this.alertSave = false;
    this.loading = false;
    this.router.navigateByUrl("/signin");
  }

  onShortcutCreate() {
    this.router.navigateByUrl("/create-shortcut");
  }

  onShortcutDelete(event: ShortcutModel) {
    ipcRenderer.send("remove-shortcut", event);
    this.configService.removeShortcut(event.shortcut);
  }
}
