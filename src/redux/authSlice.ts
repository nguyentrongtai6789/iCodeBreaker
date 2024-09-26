import { createAction, createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "./authActions";
import httpMethod from "../config/httpMethod";
import { languages } from "../i18n/i18n";

interface IAuthState {
  loading: boolean;
  username: string;
  userToken: string | null;
  language: keyof typeof languages;
  countLoading: number;
  userInfo: any;
}

export const initialState: IAuthState = {
  loading: false,
  username: localStorage.getItem("username") || "",
  userToken: localStorage.getItem("userToken") || null,
  language: (localStorage.getItem("language") ||
    "en") as keyof typeof languages,
  countLoading: 0,
  userInfo: localStorage.getItem("userInfo") || {},
};

export const handleLogout = createAction("auth/handleLogout");

export const handleChangeLanguage = createAction<string>(
  "auth/handleChangeLanguage"
);

export const handleLoading = createAction("auth/handleLoading");

export const loadingCancel = createAction("auth/loadingCancel");

export const loginSuccess = createAction<any>("auth/loginSuccess");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state: IAuthState, action) => {
      localStorage.clear();
      state.loading = false;
      state.username = "";
      state.userToken = null;
      httpMethod.attachTokenToHeader();
    },
    handleChangeLanguage: (state: IAuthState, action) => {
      localStorage.setItem("language", action.payload);
      state.language = action.payload;
    },
    handleLoading: (state: IAuthState, action) => {
      state.loading = true;
      state.countLoading = state.countLoading + 1;
    },
    loadingCancel: (state: IAuthState, action) => {
      if (state.countLoading === 0) return;
      state.countLoading = state.countLoading - 1;
      if (state.countLoading === 0) {
        state.loading = false;
      }
    },
    loginSuccess: (state: IAuthState, action) => {
      state.userToken = action.payload.id_token; // ko set 2 thằng củ lìn này thì bên kia nó sẽ bị null
      state.username = action.payload.name;
      localStorage.setItem("userToken", action.payload.id_token);
      localStorage.setItem("username", action.payload.name);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem(
        "danhSachChucNang",
        JSON.stringify(action.payload.danhSachChucNang)
      );
      httpMethod.attachTokenToHeader();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state: IAuthState, action) => {
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state: IAuthState, { payload }) => {
        state.loading = false;
        // state.userToken = payload.userToken;
      })
      .addCase(handleLogin.rejected, (state: IAuthState, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
