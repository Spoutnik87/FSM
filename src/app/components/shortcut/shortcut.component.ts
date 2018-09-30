import { ShortcutModel } from "./../../models/shortcut.model";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-shortcut",
  templateUrl: "./shortcut.component.html",
  styleUrls: ["./shortcut.component.css"]
})
export class ShortcutComponent {
  faTrash = faTrash;

  @Input()
  shortcut: ShortcutModel;

  @Output()
  delete = new EventEmitter<ShortcutModel>();

  onDelete() {
    this.delete.emit(this.shortcut);
  }
}
