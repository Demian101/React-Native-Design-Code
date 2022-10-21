import {configureStore} from "@reduxjs/toolkit";
import {profileSlice} from "./reducer/profileSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

// import {schoolReducer} from "./schoolSlice";

// // 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
  reducer:{
    profile: profileSlice.reducer
  },
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // ...
    )
});

setupListeners(store.dispatch);
export default store;