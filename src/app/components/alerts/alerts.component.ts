import { OnInit, Component } from "@angular/core";
import { Observable } from "rxjs";
import { AlertModel } from "../../models/alert.model";
import { Store } from "@ngrx/store";
import { IFreenasState, getAlerts, LoadAlerts } from "../../store";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html"
})
export class AlertsComponent implements OnInit {
  alerts$: Observable<AlertModel[]>;

  constructor(private store: Store<IFreenasState>) {}

  ngOnInit() {
    this.alerts$ = this.store.select(getAlerts);
    this.store.dispatch(new LoadAlerts());
  }
}
