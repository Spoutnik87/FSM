import { ShortcutModel } from "./shortcut.model";

export interface ConfigModel {
  setup: boolean;
  url: string;
  username: string;
  password: string;
  rememberPassword: boolean;
  shortcuts: ShortcutModel[];
}
