import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { VolumeModel } from "../models/volume.model";

@Injectable()
export class VolumesService {
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {}

  getVolumes(): Observable<VolumeModel[]> {
    return this.httpClient.get(
      this.configService.getUrl() + "/storage/volume/"
    ) as Observable<VolumeModel[]>;
  }

  lockVolume(volumeId: number): Observable<any> {
    return this.httpClient.post(
      `${this.configService.getUrl()}/storage/volume/${volumeId}/lock/`,
      undefined,
      {
        responseType: "text"
      }
    ) as Observable<any>;
  }

  unlockVolume(
    volumeId: number,
    passphrase: string,
    recoveryKey?: string
  ): Observable<any> {
    return this.httpClient.post(
      `${this.configService.getUrl()}/storage/volume/${volumeId}/unlock/`,
      {
        passphrase,
        recovery_key: recoveryKey
      },
      {
        responseType: "text"
      }
    ) as Observable<any>;
  }
}
