import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class AppService {
  private username: string;
  private password: string;

  constructor(private configService: ConfigService) {
    this.username = this.configService.getUsername();
    this.password = this.configService.getPassword();
  }

  setUsername(username: string): void {
    this.username = username;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getAuthorizationToken(): string {
    return Buffer.from(`${this.username}:${this.password}`).toString('base64');
  }
}
