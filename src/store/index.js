import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {profileSlice} from "./reducer/profileSlice";
import {cardSlice} from "./reducer/cardSlice";

// import {schoolReducer} from "./schoolSlice";

// // 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
  reducer:{
    profile: profileSlice.reducer,
    card: cardSlice.reducer
  },
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // ...
    )
});

setupListeners(store.dispatch);
export default store;