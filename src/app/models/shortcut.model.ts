export interface ShortcutModel {
  shortcut: string;
  type: 'unlock' | 'lock';
  volumeId: number;
}
