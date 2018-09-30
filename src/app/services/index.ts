import { ConfigService } from "./config.service";
import { VersionService } from "./version.service";
import { AlertsService } from "./alerts.service";
import { VolumesService } from "./volumes.service";
import { AppService } from "./app.service";

export const services: any[] = [
  ConfigService,
  AppService,
  VersionService,
  AlertsService,
  VolumesService
];

export * from "./config.service";
export * from "./app.service";
export * from "./version.service";
export * from "./alerts.service";
export * from "./volumes.service";
