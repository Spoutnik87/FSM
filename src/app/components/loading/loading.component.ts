import { Component, Input } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  faCircleNotch = faCircleNotch;

  @Input()
  size: SizeProp = '3x';

  @Input()
  center = false;
}
