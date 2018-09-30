import { Action } from "@ngrx/store";

export const SEND_SUCCESS_MESSAGE = "SEND_SUCCESS_MESSAGE";
export const SEND_SUCCESS_MESSAGES = "SEND_SUCCESS_MESSAGES";
export const SEND_ERROR_MESSAGE = "SEND_ERROR_MESSAGE";
export const SEND_ERROR_MESSAGES = "SEND_ERROR_MESSAGES";
export const SEND_INFO_MESSAGE = "SEND_INFO_MESSAGE";
export const SEND_INFO_MESSAGES = "SEND_INFO_MESSAGES";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

export class SendSuccessMessage implements Action {
  readonly type = SEND_SUCCESS_MESSAGE;
  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class SendSuccessMessages implements Action {
  readonly type = SEND_SUCCESS_MESSAGES;
  payload: string[];

  constructor(messages: string[]) {
    this.payload = messages;
  }
}

export class SendErrorMessage implements Action {
  readonly type = SEND_ERROR_MESSAGE;
  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class SendErrorMessages implements Action {
  readonly type = SEND_ERROR_MESSAGES;
  payload: string[];

  constructor(messages: string[]) {
    this.payload = messages;
  }
}

export class SendInfoMessage implements Action {
  readonly type = SEND_INFO_MESSAGE;
  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class SendInfoMessages implements Action {
  readonly type = SEND_INFO_MESSAGES;
  payload: string[];

  constructor(messages: string[]) {
    this.payload = messages;
  }
}

export class RemoveMessage implements Action {
  readonly type = REMOVE_MESSAGE;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class ClearMessages implements Action {
  readonly type = CLEAR_MESSAGES;
}

export type MessagesAction =
  | SendSuccessMessage
  | SendSuccessMessages
  | SendErrorMessage
  | SendErrorMessages
  | SendInfoMessage
  | SendInfoMessages
  | RemoveMessage
  | ClearMessages;
