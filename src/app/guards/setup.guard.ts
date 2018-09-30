import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { ConfigService } from "../services/config.service";
import { Observable } from "rxjs";

@Injectable()
export class SetupGuard implements CanActivate {
  constructor(private router: Router, private configService: ConfigService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isSetup = this.configService.isSetup();
    if (!isSetup) {
      this.router.navigateByUrl("/config");
    }
    return isSetup;
  }
}
