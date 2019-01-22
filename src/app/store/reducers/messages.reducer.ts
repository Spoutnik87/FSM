import { MessageModel } from './../../models/message.model';
import {
  MessagesAction,
  CLEAR_MESSAGES,
  SEND_SUCCESS_MESSAGE,
  SEND_SUCCESS_MESSAGES,
  SEND_ERROR_MESSAGE,
  SEND_ERROR_MESSAGES,
  SEND_INFO_MESSAGE,
  SEND_INFO_MESSAGES,
  REMOVE_MESSAGE,
} from './../actions/messages.action';
import { v4 } from 'uuid';
import { omit, reduce } from 'lodash';

export interface IMessagesReducerState {
  [id: string]: MessageModel;
}

const initialState: IMessagesReducerState = {};

export function messagesReducer(state = initialState, action: MessagesAction): IMessagesReducerState {
  let id;
  switch (action.type) {
    case SEND_SUCCESS_MESSAGE:
      return {
        ...state,
        [(id = v4())]: {
          id,
          type: 'success',
          message: action.payload,
        },
      };
    case SEND_SUCCESS_MESSAGES:
      return {
        ...state,
        ...action.payload.reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [(id = v4())]: {
              id,
              type: 'success',
              message: currentValue,
            },
          }),
          {}
        ),
      };
    case SEND_ERROR_MESSAGE:
      return {
        ...state,
        [(id = v4())]: {
          id,
          type: 'danger',
          message: action.payload,
        },
      };
    case SEND_ERROR_MESSAGES:
      return {
        ...state,
        ...action.payload.reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [(id = v4())]: {
              id,
              type: 'danger',
              message: currentValue,
            },
          }),
          {}
        ),
      };
    case SEND_INFO_MESSAGE:
      return {
        ...state,
        [(id = v4())]: {
          id,
          type: 'info',
          message: action.payload,
        },
      };
    case SEND_INFO_MESSAGES:
      return {
        ...state,
        ...action.payload.reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [(id = v4())]: {
              id,
              type: 'info',
              message: currentValue,
            },
          }),
          {}
        ),
      };
    case REMOVE_MESSAGE:
      return omit(state, action.payload);
    case CLEAR_MESSAGES:
      return {};
    default:
      return state;
  }
}

export const getMessages = (state: IMessagesReducerState) => Object.keys(state).map(key => state[key]);
export const getSuccessMessages = (state: MessageModel[]) => state.filter(message => message.type === 'success');
export const getErrorMessages = (state: MessageModel[]) => state.filter(message => message.type === 'danger');
export const getInfoMessages = (state: MessageModel[]) => state.filter(message => message.type === 'info');
