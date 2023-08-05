import { createSlice } from "@reduxjs/toolkit";

const AccountSlice = createSlice({
  name: "account",
  initialState: {
    account: {
      listAccounts: [
        {
          _id: "",
          username: "",
          avatar: "",
          email: "",
          phone: "",
          address: "",
          role: 1,
        },
      ],
      account: {
        _id: "",
        username: "",
        avatar: "",
        email: "",
        phone: "",
        address: "",
        role: 2,
        historySeen: [{ _id: "", name: "", url: "" }],
      },
      accountUpdate: {
        _id: "",
        username: "",
        avatar: "",
        email: "",
        phone: "",
        address: "",
        historySeen: [{ _id: "", name: "", url: "" }],
      },

      isFetching: false,
      errors: false,
    },
  },
  reducers: {
    getAccountStart: (state) => {
      state.account.isFetching = true;
    },
    getAccountSuccess: (state, action) => {
      state.account.isFetching = false;
      state.account.account = action.payload;
      state.account.errors = false;
    },
    getAccountFailed: (state) => {
      state.account.isFetching = false;
      state.account.errors = true;
    },
    setupdateAccount: (state, action) => {
      state.account.accountUpdate = action.payload;
    },
    updateHistoryAccount: (state, action) => {
      state.account.accountUpdate.historySeen = action.payload;
    },
    getListAccounts: (state, action) => {
      state.account.listAccounts = action.payload;
    },
  },
});

export const {
  getAccountStart,
  getAccountSuccess,
  getAccountFailed,
  setupdateAccount,
  updateHistoryAccount,
  getListAccounts,
} = AccountSlice.actions;
export default AccountSlice.reducer;
