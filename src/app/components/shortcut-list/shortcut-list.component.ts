import { ShortcutModel } from './../../models/shortcut.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shortcut-list',
  templateUrl: './shortcut-list.component.html',
})
export class ShortcutListComponent {
  @Input()
  shortcuts: ShortcutModel[];

  @Output()
  delete = new EventEmitter<ShortcutModel>();

  onDelete(event) {
    this.delete.emit(event);
  }
}
