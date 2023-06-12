import { createReducer } from '@reduxjs/toolkit';
import {
  MailObjType,
  LabelObjType,
  FolderObjType,
  ConnectionObjType,
} from '@crema/models/apps/Mail';
import {
  ChangeReadMailAction,
  ComposeMailAction,
  GetConnectionAction,
  GetFolderListAction,
  GetLabelAction,
  GetMailAction,
  GetMailListAction,
  NullifyMailAction,
  ToggleDrawerAction,
  UpdateMailAction,
  UpdateMailFolderAction,
  UpdateMailLabelAction,
  UpdateStartedAction,
} from './ActionTypes/Mail';

const initialState: {
  mailList: MailObjType[];
  totalMails: number;
  mailDrawer: boolean;
  labelList: LabelObjType[];
  folderList: FolderObjType[];
  selectedMail: MailObjType | null;
  connectionList: ConnectionObjType[];
} = {
  mailList: [],
  totalMails: 0,
  mailDrawer: false,
  labelList: [],
  folderList: [],
  selectedMail: null,
  connectionList: [],
};

const mailReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetMailListAction, (state, action) => {
      state.mailList = action.payload.data;
      state.totalMails = action.payload.count;
    })
    .addCase(GetFolderListAction, (state, action) => {
      state.folderList = action.payload;
    })
    .addCase(ToggleDrawerAction, (state, action) => {
      state.mailDrawer = !state.mailDrawer;
    })
    .addCase(GetLabelAction, (state, action) => {
      state.labelList = action.payload;
    })
    .addCase(GetConnectionAction, (state, action) => {
      state.connectionList = action.payload;
    })
    .addCase(ComposeMailAction, (state, action) => {
      const path = action.payload.pathname.split('/');
      let mailList = state.mailList;
      let totalMails = state.totalMails;
      if (
        path[path.length - 2] === 'folder' &&
        path[path.length - 1] === 'sent'
      ) {
        mailList = [action.payload.data, ...state.mailList];
        totalMails = state.totalMails + 1;
      }
      state.mailList = mailList;
      state.totalMails = totalMails;
    })
    .addCase(UpdateMailFolderAction, (state, action) => {
      const updatedList = state.mailList.filter(
        (mail) => !action.payload.includes(mail.id)
      );
      state.mailList = updatedList;
      state.totalMails = updatedList.length;
    })
    .addCase(UpdateMailLabelAction, (state, action) => {
      const mailIds = action.payload.map((mail) => mail.id);
      const updatedList = state.mailList.map((mail) => {
        if (mailIds.includes(mail.id)) {
          return action.payload.find(
            (selectedMail) => selectedMail.id === mail.id
          );
        } else {
          return mail;
        }
      });
      state.mailList = updatedList as MailObjType[];
    })
    .addCase(ChangeReadMailAction, (state, action) => {
      const mailIds = action.payload.map((mail) => mail.id);
      const updatedList = state.mailList.map((mail) => {
        if (mailIds.includes(mail.id)) {
          return action.payload.find(
            (selectedMail) => selectedMail.id === mail.id
          );
        } else {
          return mail;
        }
      });
      state.mailList = updatedList as MailObjType[];
    })
    .addCase(UpdateStartedAction, (state, action) => {
      const mailIds = action.payload.data.map((mail) => mail.id);
      const updatedList = state.mailList.map((mail) => {
        if (mailIds.includes(mail.id)) {
          return action.payload.data.find(
            (selectedMail) => selectedMail.id === mail.id
          );
        } else {
          return mail;
        }
      });
      const filteredList =
        action.payload.folderName === 'starred'
          ? updatedList.filter((item) => item?.isStarred)
          : updatedList;
      const total =
        action.payload.folderName === 'starred'
          ? state.totalMails - action.payload.data.length
          : state.totalMails;
      state.mailList = filteredList as MailObjType[];
      state.totalMails = total;
    })
    .addCase(GetMailAction, (state, action) => {
      state.selectedMail = action.payload;
    })
    .addCase(UpdateMailAction, (state, action) => {
      state.selectedMail = action.payload;
      state.mailList = state.mailList.map((data) =>
        data.id === action.payload.id ? action.payload : data
      );
    })
    .addCase(NullifyMailAction, (state, action) => {
      state.selectedMail = null;
    });
});

export default mailReducer;
