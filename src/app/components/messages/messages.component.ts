import { Observable } from "rxjs";
import { MessageModel } from "./../../models/message.model";
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  IFreenasState,
  ClearMessages,
  RemoveMessage,
  getMessages
} from "../../store";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html"
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages$: Observable<MessageModel[]>;

  constructor(private store: Store<IFreenasState>) {}

  ngOnInit() {
    this.messages$ = this.store.select(getMessages);
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearMessages());
  }

  removeMessage(id: string) {
    this.store.dispatch(new RemoveMessage(id));
  }
}
