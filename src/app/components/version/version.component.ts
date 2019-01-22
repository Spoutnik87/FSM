import { VersionModel } from './../../models/version.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
})
export class VersionComponent {
  @Input()
  version: VersionModel;
}
