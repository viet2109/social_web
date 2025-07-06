import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./appSlice";
import authReducer from "./authSlice";
import settingReducer from "./settingSlice";

const authConfig = {
  key: "auth",
  storage,
};

const settingConfig = {
  key: "setting",
  storage,
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authConfig, authReducer),
  setting: persistReducer(settingConfig, settingReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
