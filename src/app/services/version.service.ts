import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { VersionModel } from "../models/version.model";

@Injectable()
export class VersionService {
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {}

  public getVersion() {
    return this.httpClient.get(
      this.configService.getUrl() + "/system/version/"
    ) as Observable<VersionModel>;
  }
}
