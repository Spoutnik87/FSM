import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SignInComponent {
  public user: {
    username: string;
    password: string;
    rememberPassword: boolean;
  };

  loading = false;
  alertInvalid = false;

  constructor(private router: Router, private configService: ConfigService, private appService: AppService) {
    this.user = {
      username: configService.getUsername(),
      password: configService.getPassword(),
      rememberPassword: configService.isRememberPassword(),
    };
  }

  onSubmit() {
    this.loading = true;
    if (this.user.rememberPassword) {
      this.configService.setPassword(this.user.password, false);
    } else {
      this.configService.setPassword('', false);
    }
    this.configService.setRememberPassword(this.user.rememberPassword, false);
    this.configService.setUsername(this.user.username, true);
    this.appService.setUsername(this.user.username);
    this.appService.setPassword(this.user.password);
    this.loading = false;
    this.router.navigateByUrl('/');
  }
}
