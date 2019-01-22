import { ShortcutModel } from './../models/shortcut.model';
import * as electron from 'electron';
import { join } from 'path';
import { ConfigModel } from '../models/config.model';
import { readFileSync, writeFileSync } from 'fs';

export class ConfigService {
  private path: string;
  private data: ConfigModel;

  constructor() {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    this.path = join(userDataPath, 'user-preferences.json');

    this.data = this.parseConfigFile(this.path, {
      setup: false,
      url: '',
      username: '',
      password: '',
      rememberPassword: false,
      shortcuts: [],
    });

    for (const shortcut of this.get('shortcuts')) {
      electron.ipcRenderer.send('add-shortcut', shortcut);
      electron.ipcRenderer.send('enable');
    }
  }

  isSetup(): boolean {
    return this.get('setup');
  }

  setSetup(setup: boolean, save = true): void {
    this.set('setup', setup, save);
  }

  setUrl(url: string, save = true): void {
    this.set('url', url, save);
  }

  getUrl(): string {
    return this.get('url');
  }

  setUsername(username: string, save = true): void {
    this.set('username', username, save);
  }

  getUsername(): string {
    return this.get('username');
  }

  getPassword(): string {
    if (this.isRememberPassword()) {
      return Buffer.from(this.get('password'), 'base64').toString('utf8');
    } else {
      return '';
    }
  }

  getShortcuts() {
    return this.get('shortcuts');
  }

  setPassword(password: string, save = true): void {
    this.set('password', Buffer.from(password, 'utf8').toString('base64'), save);
  }

  setRememberPassword(rememberPassword: boolean, save = true): void {
    this.set('rememberPassword', rememberPassword, save);
  }

  isRememberPassword(): boolean {
    return this.get('rememberPassword');
  }

  addShortcut(shortcut: ShortcutModel, save = true): void {
    this.set('shortcuts', [...this.data.shortcuts, shortcut], save);
  }

  removeShortcut(shortcut: string, save = true) {
    this.set('shortcuts', this.data.shortcuts.filter(elem => elem.shortcut !== shortcut), save);
  }

  clearShortcuts(save = true) {
    this.set('shortcuts', [], save);
  }

  getConfig(): ConfigModel {
    return this.data;
  }

  private parseConfigFile(path: string, defaults: ConfigModel): ConfigModel {
    try {
      return JSON.parse(readFileSync(path).toString());
    } catch (error) {
      return defaults;
    }
  }

  private set<T extends keyof ConfigModel>(key: T, value: ConfigModel[T], save = true): void {
    this.data[key] = value;

    if (save) {
      writeFileSync(this.path, JSON.stringify(this.data));
    }
  }

  private get<T extends keyof ConfigModel>(key: T): ConfigModel[T] {
    return this.data[key];
  }
}
