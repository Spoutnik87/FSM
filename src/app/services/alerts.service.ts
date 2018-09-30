import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { AlertModel } from "../models/alert.model";

@Injectable()
export class AlertsService {
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {}

  getAlerts(): Observable<AlertModel[]> {
    return this.httpClient.get(
      this.configService.getUrl() + "/system/alert/"
    ) as Observable<AlertModel[]>;
  }
}
