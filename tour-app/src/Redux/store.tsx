import { Action, configureStore } from "@reduxjs/toolkit";
import hotTour from "./State/Tours.slice";
import collection from "./State/Collections.slice";
import province from "./State/Province.slice";
import tourCompare from "./State/Comparetours.slice";
import account from "./State/Account.slice";
import blog from "./State/Blog.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const middlewareConfiguration = { serializableCheck: false };
export const store = configureStore({
  reducer: { hotTour, collection, province, tourCompare, account, blog },
  devTools: {
    name: "TravelTA",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(middlewareConfiguration),
});
export type RootState = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
