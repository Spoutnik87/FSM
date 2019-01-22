import { VersionEffects } from './version.effect';
import { AlertsEffects } from './alerts.effect';
import { VolumesEffects } from './volumes.effect';

export const effects: any[] = [VersionEffects, AlertsEffects, VolumesEffects];

export * from './version.effect';
export * from './alerts.effect';
export * from './volumes.effect';
