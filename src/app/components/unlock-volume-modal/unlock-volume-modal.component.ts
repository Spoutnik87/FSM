import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { VolumeModel } from "./../../models/volume.model";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-unlock-volume-modal",
  templateUrl: "./unlock-volume-modal.component.html"
})
export class UnlockVolumeModalComponent {
  @Input()
  volume: VolumeModel;

  @Output()
  submit = new EventEmitter();

  @ViewChild("modalContent")
  modalContent;

  passphrase = "";
  recoveryKey = "";

  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  show() {
    if (this.modalRef == null) {
      this.passphrase = "";
      this.recoveryKey = "";
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(
        () => {
          this.modalRef = null;
        },
        () => {
          this.modalRef = null;
        }
      );
    }
  }

  hide() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  onSubmit() {
    this.submit.emit({
      volumeId: this.volume.id,
      passphrase: this.passphrase,
      recoveryKey: this.recoveryKey
    });
  }
}
