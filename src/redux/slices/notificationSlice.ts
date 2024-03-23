import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageRequest, PageResponse } from "@/redux/types";

export enum NotificationStatus {
  Read = "Read",
  Unread = "Unread",
}

export enum NotificationType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
  Loading = "loading",
}

export interface Notification {
  id: string;
  content: string;
  status: NotificationStatus;
  type: NotificationType;
  createdAt: Date;
}

export interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  canLoadMore: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  canLoadMore: true,
};

export interface FetchNotificationsRequestPayload extends PageRequest {
  status?: NotificationStatus;
  type?: NotificationType;
}

export interface UpdateNotificationStatusRequestPayload {
  id: string;
  status: NotificationStatus;
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    fetchNotificationsRequest: (
      state,
      action: PayloadAction<FetchNotificationsRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotificationsSuccess: (
      state,
      action: PayloadAction<PageResponse<Notification>>,
    ) => {
      state.canLoadMore = action.payload.lastPage;
      state.notifications = [
        ...state.notifications,
        ...action.payload.items,
      ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      state.loading = false;
    },
    fetchNotificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateNotificationStatusRequest: (
      state,
      action: PayloadAction<UpdateNotificationStatusRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateNotificationStatusSuccess: (
      state,
      action: PayloadAction<UpdateNotificationStatusRequestPayload>,
    ) => {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload.id) {
          notification.status = action.payload.status;
        }
        return notification;
      });
      state.loading = false;
    },
    updateNotificationStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    markAllNotificationsAsReadRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    markAllNotificationsAsReadSuccess: (state) => {
      state.notifications = state.notifications.map((notification) => {
        notification.status = NotificationStatus.Read;
        return notification;
      });
      state.loading = false;
    },
    markAllNotificationsAsReadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  fetchNotificationsRequest,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  updateNotificationStatusRequest,
  updateNotificationStatusSuccess,
  updateNotificationStatusFailure,
  markAllNotificationsAsReadSuccess,
  markAllNotificationsAsReadRequest,
  markAllNotificationsAsReadFailure,
  clearNotifications,
} = notificationSlice.actions;

export const NotificationReducer = notificationSlice.reducer;
